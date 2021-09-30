/* Import the required libraries and types */
import React from "react";
import history from "../history";
import moment from "moment";

/* Import components */
import { getContactDetails, deleteContact } from "../api/contactApi";
import { getId } from "../api/userApi";
import { IContact } from "../interfaces";
import "../css/newContact.css";

/* Component for contact details */
class detailsContact extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        contact: {} as IContact,
    };

    /* Extract id from the url */
    contactId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        /* Get contact details and set the states */
        await getContactDetails(this.contactId).then(
            (response) => {
                var data = response.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    contact: data.data,
                });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Handle when click on delete button */
    handleDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        /* Delete contact then push new entry to history */
        deleteContact(this.contactId);
    };

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, contact } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Contact Details</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() =>
                                    history.push(
                                        `/contacts/details/amend/?id=${contact._id}`
                                    )
                                }
                            >
                                <h2>Edit</h2>
                            </button>
                        </h2>
                    </div>
                    <div className="box">
                        <div className="boxLeft">
                            <label>Name</label>
                            <div className="box, white">
                                <h2>
                                    {contact.name.first} {contact.name.middle}{" "}
                                    {contact.name.last}
                                </h2>
                            </div>

                            <label>Gender</label>
                            <div className="box, white">
                                <h2>{contact.gender}</h2>
                            </div>
                            <label>Email</label>
                            <div className="box white">
                                <h2>{contact.email}</h2>
                            </div>
                        </div>
                        <label>Phone Number</label>
                        <div className="box, white">
                            <h2>{contact.phoneNumber}</h2>
                        </div>
                        <label>Relationship</label>
                        <div className="box, white">
                            <h2>{contact.relationship}</h2>
                        </div>
                        <label>Date of Birth</label>
                        <div className="box, white">
                            <h2>
                                {moment(contact.dateOfBirth).format(
                                    "DD MMM YYYY"
                                )}
                            </h2>
                        </div>
                        <label>First Contact Timestamp</label>
                        <div className="box, white">
                            <h2>
                                {moment(contact.lastMet).format("DD MMM YYYY")}
                            </h2>
                        </div>
                        <label>Assigned Group</label>
                        <div className="box, white">
                            <h2>{contact.groupId?.name}</h2>
                        </div>
                    </div>

                    <div className="boxRight">
                        <label>Additional Notes</label>
                        <div className="box, white">
                            <h2>{contact.additionalNotes}</h2>
                        </div>
                    </div>

                    <button
                        className="base-button"
                        type="button"
                        onClick={this.handleDelete}
                    >
                        <h2>Delete</h2>
                    </button>
                </div>
            );
        }
    }
}

/* Export component */
export default detailsContact;

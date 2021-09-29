/* Import the required libraries and types */
import React from "react";
import "../css/newContact.css";

/* Import the required libraries and types */
import { getContactDetails, deleteContact } from "../api/contactApi";
import { getId } from "../api/userApi";
import { IContact } from "../interfaces";

/* Component to contact details */
class detailsContact extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        contact: {} as IContact,
    };

    contactId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        getContactDetails(this.contactId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    contact: data,
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

        /* Create memo. Then push new entry to history */
        deleteContact(this.contactId);
    };

    render() {
        const { error, isLoaded, contact } = this.state;

        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <h1>Contact Details</h1>
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
                        <label>First Contact Timestamp</label>
                        <div className="box, white">
                            <h2>{contact.lastMet}</h2>
                        </div>
                        <label>Assigned Group</label>
                        <div className="box, white">
                            <h2>{contact.groupId}</h2>
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

export default detailsContact;

/* Import the required libraries and types */
import React from "react";
import history from "../history";
import moment from "moment";

/* Import components */
import { getContactDetails, deleteContact } from "../api/contactApi";
import { getId } from "../api/userApi";
import { IContact } from "../interfaces";

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
                <div className="frame-pages">
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
                    <div className="grid-container-contacts">
                        <div>
                            <h2>Name</h2>
                            <div className="display-content white">
                                <p>
                                    {contact.name.first} {contact.name.middle}{" "}
                                    {contact.name.last}
                                </p>
                            </div>
                        </div>

                        {contact.gender !== undefined ? (
                            <div>
                                <h2>Gender</h2>
                                <div className="display-content white">
                                    <p>{contact.gender}</p>
                                </div>
                            </div>
                        ) : null}

                        {contact.email !== undefined ? (
                            <div>
                                <h2>Email</h2>
                                <div className="display-content white">
                                    <p>{contact.email}</p>
                                </div>
                            </div>
                        ) : null}

                        {contact.phoneNumber !== undefined ? (
                            <div>
                                <h2>Phone Number</h2>
                                <div className="display-content white">
                                    <p>{contact.phoneNumber}</p>
                                </div>
                            </div>
                        ) : null}

                        {contact.relationship !== undefined ? (
                            <div>
                                <h2>Relationship</h2>
                                <div className="display-content white">
                                    <p>{contact.relationship}</p>
                                </div>
                            </div>
                        ) : null}

                        {contact.dateOfBirth !== undefined ? (
                            <div>
                                <h2>Date of Birth</h2>
                                <div className="display-content white">
                                    <p>
                                        {moment(contact.dateOfBirth).format(
                                            "DD MMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {contact.lastMet !== undefined ? (
                            <div>
                                <h2>First Contact Timestamp</h2>
                                <div className="display-content white">
                                    <p>
                                        {moment(contact.lastMet).format(
                                            "DD MMM YYYY"
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {contact.groupId !== undefined ? (
                            <div>
                                <h2>Assigned Group</h2>
                                <div className="display-content white">
                                    <p>{contact.groupId?.name}</p>
                                </div>
                            </div>
                        ) : null}

                        {contact.additionalNotes !== undefined ? (
                            <div>
                                <div className="boxRight">
                                    <h2>Additional Notes</h2>
                                    <div className="display-content white">
                                        <p>{contact.additionalNotes}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
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

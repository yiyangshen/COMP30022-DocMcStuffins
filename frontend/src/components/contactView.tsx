/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { getContacts } from "../api/contactApi";

/* Component for view contacts */
class contactView extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        contactsList: [] as IContact[],
    };

    /* During loading page */
    async componentDidMount() {
        /* Get all contacts and set states */
        getContacts().then(
            (response) => {
                var data = response.data.data;
                this.setState({ contactsList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, contactsList } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Contact Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <div className="title">
                        <h1>
                            <b>Contacts</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() => history.push(`/contacts/new`)}
                            >
                                <h2>New Contact</h2>
                            </button>
                        </h1>
                    </div>

                    <table className="table-lable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        {contactsList !== undefined &&
                        contactsList.length > 0 ? (
                            <tbody>
                                {contactsList.map((contact, i) => (
                                    <tr
                                        className="table-content"
                                        key={i}
                                        onClick={() =>
                                            history.push(
                                                `/contacts/details/?id=${contact._id}`
                                            )
                                        }
                                    >
                                        <td>
                                            {contact.name.first}{" "}
                                            {contact.name.last}
                                        </td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr className="table-content">
                                    <td></td>
                                    <td>No data yet</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        )}
                    </table>

                    <div className="table"></div>
                </div>
            );
        }
    }
}

/* Export component */
export default contactView;

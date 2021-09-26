/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getContacts } from "../api/contactApi";
import { IContact } from "../interfaces";

/* Component to view contacts */
class ViewContacts extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        contactsList: [] as IContact[],
    };

    /* During loading page */
    async componentDidMount() {
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

    render() {
        const { error, isLoaded, contactsList } = this.state;

        if (error === true) {
            return <h3 className="error">No Contact Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Contacts</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() => history.push(`/contacts/new`)}
                            >
                                <h2>New Contact</h2>
                            </button>
                        </h2>
                    </div>

                    <table>
                        <thead>
                            <tr className="table-lable">
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        {contactsList !== undefined &&
                        contactsList.length > 0 ? (
                            <div>
                                {contactsList.map((contact, i) => (
                                    <div key={i}>
                                        {" "}
                                        <tbody>
                                            <tr
                                                className="table-contents"
                                                onClick={() =>
                                                    history.push(
                                                        `/contacts/details/?id=${contact.userId}`
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
                                        </tbody>
                                    </div>
                                ))}{" "}
                            </div>
                        ) : (
                            <tbody>
                                <tr>
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

export default ViewContacts;

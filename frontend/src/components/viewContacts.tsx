/* Import the required libraries and types */
import React from "react";

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
                var data = response.data.items;
                this.setState({ contactsList: data, isLoaded: true });
            },
            //reponse self-initialised
            //data is inside nested json
            //return reponse, type json
            (error) => {
                this.setState({ isLoaded: true, error }); //order does not matter, saying isloaded = true, error = error
                console.log(error);
            }
        );
    }

    render() {
        const { error, isLoaded, contactsList } = this.state; //defining constants 

        if (error === true) {
            return <h3 className="error">No Order Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Contacts</b>
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
                        contactsList.length > 0 ? ( // ? = if, : = else
                            <div>
                                {contactsList.map((contacts, i) => ( //change contacts to memos
                                    <div key={i}> // dont change i
                                        <tbody>
                                            <tr className="table-contents">
                                                <td>{contacts.name}</td>
                                                <td>{contacts.phoneNumber}</td>
                                                <td>{contacts.email}</td>
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
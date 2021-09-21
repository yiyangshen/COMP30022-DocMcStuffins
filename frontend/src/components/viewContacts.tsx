import React, { useEffect, useState } from "react";

/* Import the required libraries and types */
import { getContacts } from "../api";
import { IContact } from "../interfaces";

function ViewContacts() {
    const [contactsList, setContactsList] = useState<Array<IContact>>([]);
    const [error, setError] = useState(true);

    useEffect(() => {
        getContacts().then(
            (response) => {
                var data = response.data.items;
                setContactsList(data);
                setError(false);
            },
            (error) => {
                setError(true);
            }
        );
    });

    return error ? (
        <h3>Error</h3>
    ) : (
        <div className="border">
            <div className="title">
                <h2>
                    <b>Contacts</b>
                </h2>
            </div>

            <table>
                <tr className="table-lable">
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>

                {contactsList.map((contacts, i) => (
                    <div key={i}>
                        <tr className="table-contents">
                            <td>{contacts.name}</td>
                            <td>{contacts.phoneNumber}</td>
                            <td>{contacts.email}</td>
                        </tr>
                    </div>
                ))}
            </table>

            <div className="table"></div>
        </div>
    );
}

export default ViewContacts;

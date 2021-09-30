/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getContacts } from "../api/contactApi";
import { IContact } from "../interfaces";

class addContact extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        contactsList: [] as IContact[],
        chosen: [] as IContact[],
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

    handleCheckboxChange = (e: { target: { value: any } }) => {
        const tools = this.state.chosen; //Array in parent component
        const value = e.target.value; //Checkbox value
        tools.includes(value) //If Array contains value
            ? tools.filter((tool) => tool._id !== value) // Then remove item from Array
            : tools.push(value); // Else, push item to Array;
        console.log(value);
    };

    /* Handle when click on submit button */
    handleOnClick = (event: { preventDefault: () => void }) => {
        const { chosen } = this.state;
        event.preventDefault();
        console.log(chosen);

        localStorage.setItem("chosen", JSON.stringify(chosen));
        history.push(`/groups/new`);
    };

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
                            <b>Adding Contacts to Group</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={this.handleOnClick}
                            >
                                <h2>Add to Group</h2>
                            </button>
                        </h2>
                    </div>

                    <table>
                        <thead>
                            <tr className="table-lable">
                                <th>
                                    <input type="checkbox" />
                                </th>
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
                                            <tr className="table-contents">
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        name="id"
                                                        value={contact._id}
                                                        onChange={
                                                            this
                                                                .handleCheckboxChange
                                                        }
                                                    />
                                                </td>

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

export default addContact;

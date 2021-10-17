/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IContact } from "../interfaces";

/* Import the required libraries and types */

/* Component for adding contact to a specified group */
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
        const contactsJSON = localStorage.getItem("contacts");
        const membersJSON = localStorage.getItem("members");
        let members: IContact[] = [];
        let contacts: IContact[] = [];

        if (membersJSON) {
            members = JSON.parse(membersJSON);
        }

        if (contactsJSON) {
            contacts = JSON.parse(contactsJSON);
        }

        this.setState({
            isLoaded: true,
            chosen: [...members],
            contactsList: [...contacts],
        });
    }

    /* Handle change whne checkbock is clicked */
    handleCheckboxChange = (event: { target: { value: any } }) => {
        let chosen = this.state.chosen; //Array in parent component
        const value = event.target.value; //Checkbox value
        const item = this.state.contactsList.find(
            (contact) => contact._id.toString() === value.toString()
        );
        if (item) {
            if (
                chosen.some(
                    (chosenContact) =>
                        chosenContact._id.toString() === value.toString()
                )
            ) {
                chosen = chosen.filter(
                    (contact) => contact._id.toString() !== value.toString()
                );
            } else {
                chosen.push(item);
            }
        }
        this.setState({ chosen: [...chosen] });
    };

    /* Handle when click on submit button */
    handleOnClick = (event: { preventDefault: () => void }) => {
        const { chosen } = this.state;
        event.preventDefault();

        /* Store checked item in local storage to access it in different page, then go back to creating new group */
        localStorage.setItem("members", JSON.stringify(chosen));
        history.goBack();
    };

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, contactsList, chosen } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Contact Present to be added</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <div className="title">
                        <h1>
                            <b>Adding Contacts to Group</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={this.handleOnClick}
                            >
                                <h2>Add to Group</h2>
                            </button>
                        </h1>
                    </div>

                    <table className="table-lable">
                        <thead>
                            <tr>
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
                            <tbody>
                                {contactsList.map((contact, i) => (
                                    <tr key={i} className="table-content">
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="id"
                                                value={contact._id}
                                                onChange={
                                                    this.handleCheckboxChange
                                                }
                                                checked={[...chosen].some(
                                                    (chosenContact) =>
                                                        chosenContact._id.toString() ===
                                                        contact._id.toString()
                                                )}
                                            />
                                        </td>

                                        <td>
                                            {contact.name.first}{" "}
                                            {contact.name.last}
                                        </td>
                                        <td>{contact.phoneNumber}</td>
                                        <td>{contact.email}</td>
                                    </tr>
                                ))}{" "}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>No available data</td>
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
export default addContact;

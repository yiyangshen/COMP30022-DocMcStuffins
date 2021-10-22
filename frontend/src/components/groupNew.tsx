/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { createGroup } from "../api/groupApi";

/* Component for new cgroup */
class groupNew extends React.Component {
    /* Declare states */
    state = {
        name: "",
        members: [] as any,
        contactsList: [] as IContact[],
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* During loading page */
    async componentDidMount() {
        /* Retrieve item in local storage and parse them */
        const value = localStorage.getItem("members");
        if (value) {
            this.setState({ contactsList: JSON.parse(value) });
        }
        const h2 = localStorage.getItem("name");
        if (h2) {
            this.setState({ name: JSON.parse(h2) });
        }
    }

    /* Remember state for the next mount */
    handleEdit = () => {
        localStorage.setItem("name", JSON.stringify(this.state.name));
        localStorage.setItem(
            "prevContacts",
            JSON.stringify(this.state.contactsList)
        );
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { name, members, contactsList } = this.state;
        event.preventDefault();

        /* Loop through all contact ids and get their details, set the state */
        for (var i = 0; i < contactsList.length; i++) {
            console.log(contactsList[i]._id);
            members.push(contactsList[i]._id);
        }

        /* Remove item from local storage and create group */
        createGroup(name, members);
    };

    /* Handle when click on cancel button */
    handleCancel = (event: { preventDefault: () => void }) => {
        /* Remove item from local storage and push to group page */
        history.push("/groups");
    };

    /* Render the component to the screen */
    render() {
        const { name, contactsList } = this.state;

        return (
            <div className="frame-pages">
                <h1>Add Group</h1>

                <h2>Name</h2>
                <input
                    type="name"
                    id="groupName"
                    name="name"
                    placeholder="Eg. Unimelb"
                    value={name}
                    onChange={this.handleChange}
                    className="display-content grey"
                    required
                />
                <div className="box1">
                    <h2>Members</h2>
                    <div className="display-content white cut-10">
                        <h2>{contactsList.length}</h2>
                    </div>
                    <Link
                        to="/groups/new/contact"
                        className="addContact"
                        onClick={this.handleEdit}
                    >
                        add contact
                    </Link>
                </div>

                <table>
                    <thead>
                        <tr className="table-lable">
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {contactsList !== undefined && contactsList.length > 0 ? (
                        <tbody>
                            {contactsList.map((contact, i) => (
                                <tr key={i} className="table-contents">
                                    <td>
                                        {contact.name.first} {contact.name.last}
                                    </td>
                                    <td>{contact.phoneNumber}</td>
                                    <td>{contact.email}</td>
                                </tr>
                            ))}
                        </tbody>
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
                <button
                    className="base-button"
                    type="button"
                    onClick={this.handleCancel}
                >
                    <h2>Cancel</h2>
                </button>
                <button
                    className="base-button"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    <h2>Submit</h2>
                </button>
            </div>
        );
    }
}

/* Export component */
export default groupNew;

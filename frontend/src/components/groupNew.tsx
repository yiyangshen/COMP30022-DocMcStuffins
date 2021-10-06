/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { createGroup } from "../api/groupApi";
import { getContactDetails } from "../api/contactApi";

/* Component for new cgroup */
class groupNew extends React.Component {
    /* Declare states */
    state = {
        name: "",
        members: "" as any,
        contactsList: [] as IContact[],
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* During loading page */
    async componentDidMount() {
        /* Retrieve item in local storage and parse them */
        const value = await localStorage.getItem("chosen");
        if (value) {
            this.setState({ members: JSON.parse(value) });
        }
        const label = await localStorage.getItem("name");
        if (label) {
            this.setState({ name: JSON.parse(label) });
        }

        const { members } = this.state;

        /* Loop through all contact ids and get their details, set the state */
        for (var i = 0; i < members.length; i++) {
            getContactDetails(members[i]).then(
                (response) => {
                    var data = response.data.data;
                    this.setState({
                        contactsList: [...this.state.contactsList, data],
                    });
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    /* Remember state for the next mount */
    componentWillUnmount() {
        localStorage.setItem("name", JSON.stringify(this.state.name));
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { name, members } = this.state;
        event.preventDefault();

        /* Remove item from local storage and create group */
        localStorage.removeItem("name");
        localStorage.removeItem("chosen");
        createGroup(name, members);
    };

    /* Handle when click on cancel button */
    handleCancel = (event: { preventDefault: () => void }) => {
        /* Remove item from local storage and push to group page */
        localStorage.removeItem("name");
        localStorage.removeItem("chosen");
        history.push("/groups");
    };

    /* Render the component to the screen */
    render() {
        const { name, contactsList, members } = this.state;

        return (
            <div className="frame-pages">
                <h1>Add Group</h1>
                <div className="AGbox">
                    <label>Name</label>
                    <input
                        type="name"
                        id="groupName"
                        name="name"
                        placeholder="Eg. Unimelb"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <div className="box1">
                        <label>Members</label>
                        <div className="box, white">
                            <h2>{members.length}</h2>
                        </div>
                        <Link to="/groups/new/contact" className="addContact">
                            add contact
                        </Link>
                    </div>
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
                        <div>
                            {contactsList.map((contact, i) => (
                                <div key={i}>
                                    {" "}
                                    <tbody>
                                        <tr className="table-contents">
                                            <td>
                                                {contact.name.first}{" "}
                                                {contact.name.last}
                                            </td>
                                            <td>{contact.phoneNumber}</td>
                                            <td>{contact.email}</td>
                                        </tr>
                                    </tbody>
                                </div>
                            ))}
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

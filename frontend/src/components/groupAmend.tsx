/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { amendGroupDetails, getGroupDetails } from "../api/groupApi";
import { getContactDetails } from "../api/contactApi";
import { getId } from "../api/userApi";

/* Component for new cgroup */
class groupNew extends React.Component {
    /* Declare states */
    state = {
        name: "",
        members: "" as any,
        contactsList: [] as IContact[],
    };

    groupId = getId() || "";

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* During loading page */
    async componentDidMount() {
        /* Retrieve item in local storage and parse them */
        const value = localStorage.getItem("chosen");
        if (value) {
            this.setState({ members: JSON.parse(value) });
        }
        const h2 = localStorage.getItem("name");
        if (h2) {
            this.setState({ name: JSON.parse(h2) });
        }

        const { members } = this.state;

        /* Loop through all contact ids and get their details, adding it to ContactList*/
        for (var i = 0; i < members.length; i++) {
            await getContactDetails(members[i]).then(
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

        await getGroupDetails(this.groupId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                console.log(this.state.name);
                console.log(this.state.contactsList);
                this.setState({
                    isLoaded: true,
                });

                if (this.state.name.trim() === "") {
                    this.setState({ name: data.name });

                    if (this.state.contactsList.length === 0) {
                        this.setState({ contactsList: data.members }); //in terms of Icontacts[]
                    }
                }
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Remember state for the next mount */
    handleEdit = () => {
        localStorage.setItem("name", JSON.stringify(this.state.name));
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { name, members } = this.state;
        event.preventDefault();

        /* Remove item from local storage and create group */
        localStorage.removeItem("name");
        localStorage.removeItem("chosen");
        amendGroupDetails(this.groupId, name, members);
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
        const { name, contactsList } = this.state;

        return (
            <div className="frame-pages">
                <h1>Edit Group</h1>

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
                        onClick={this.handleEdit}
                        className="addContact"
                    >
                        add contact
                    </Link>
                </div>

                <table className="table-lable">
                    <thead>
                        <tr>
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

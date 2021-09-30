/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getGroupDetails, deleteGroup } from "../api/groupApi";
import { getId } from "../api/userApi";
import { IContact } from "../interfaces";

/* Component to group detail */
class groupDetail extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        name: "",
        members: [] as IContact[],
    };

    groupId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        getGroupDetails(this.groupId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    members: data.members,
                    name: data.name,
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

        /* delete group. Then push new entry to history */
        deleteGroup(this.groupId);
    };

    render() {
        const { name, members } = this.state;

        return (
            <div className="border">
                <div className="title">
                    <h2>
                        <b>Group Details</b>
                        <button
                            className="base-button top-right"
                            type="button"
                            onClick={() =>
                                history.push(
                                    `/groups/details/amend/?id=${this.groupId}`
                                )
                            }
                        >
                            <h2>Edit</h2>
                        </button>
                    </h2>
                </div>
                <div className="AGbox">
                    <label>Name</label>
                    <div className="box, white">
                        <h2>{name}</h2>
                    </div>
                    <div className="box1">
                        <label>Members</label>
                        <div className="box, white">
                            <h2>{members.length}</h2>
                        </div>
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
                    {members !== undefined && members.length > 0 ? (
                        <div>
                            {members.map((contact, i) => (
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

export default groupDetail;

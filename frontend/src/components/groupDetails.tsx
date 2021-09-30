/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { getGroupDetails, deleteGroup } from "../api/groupApi";
import { getId } from "../api/userApi";

/* Component for group detail */
class groupDetail extends React.Component {
    /* Declare state */
    state = {
        error: null,
        isLoaded: false,
        name: "",
        members: [] as IContact[],
    };

    /* Extract id from the url */
    groupId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        /* Get group details and set the states */
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

        /* Delete group then push new entry to history */
        deleteGroup(this.groupId);
    };

    /* Render the component to the screen */
    render() {
        const { name, members, error, isLoaded } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">Internal Error</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
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
}

/* Export component */
export default groupDetail;

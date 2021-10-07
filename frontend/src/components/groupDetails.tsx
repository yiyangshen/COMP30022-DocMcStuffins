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
        localStorage.removeItem("name");
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
                <div className="frame-pages">
                    <div className="title">
                        <h1>
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
                        </h1>
                    </div>

                    <div>
                        <h2>Name</h2>
                        <div className="display-content white cut-30">
                            <p>{name}</p>
                        </div>
                    </div>

                    <div>
                        <h2>Members</h2>
                        <div className="display-content white cut-10">
                            <p>{members.length}</p>
                        </div>
                    </div>

                    <table className="table-lable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                            </tr>
                        </thead>

                        {members !== undefined && members.length > 0 ? (
                            <tbody>
                                {members.map((contact, i) => (
                                    <tr
                                        className="table-content"
                                        key={i}
                                        onClick={() =>
                                            history.push(
                                                `/contacts/details/?id=${contact._id}`
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
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                <tr className="table-content">
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

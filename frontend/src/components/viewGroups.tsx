/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getGroups } from "../api/groupApi";
import { IGroup } from "../interfaces";

/* Component to view groups */
class ViewGroups extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        groupsList: [] as IGroup[],
    };

    /* During loading page */
    async componentDidMount() {
        getGroups().then(
            (response) => {
                var data = response.data.data;
                this.setState({ groupsList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    render() {
        const { error, isLoaded, groupsList } = this.state;

        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Groups</b>
                        </h2>
                    </div>

                    {groupsList !== undefined && groupsList.length > 0 ? (
                        <div>
                            {groupsList.map((group, i) => (
                                <div key={i}>
                                    <div className="RecentGroupText">
                                        <span
                                            className="dotMore"
                                            onClick={() =>
                                                history.push(
                                                    `/group/details/?id=${group.userId}`
                                                )
                                            }
                                        >
                                            <h2>{group.name}</h2>
                                            <h1>{group.members.length}</h1>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3>No groups available</h3>
                    )}
                </div>
            );
        }
    }
}

export default ViewGroups;

/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IGroup } from "../interfaces";

/* Import components */
import { getGroups } from "../api/groupApi";
import { Col, Row } from "react-bootstrap";

/* Component for view groups */
class groupView extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        groupsList: [] as IGroup[],
    };

    /* During loading page */
    async componentDidMount() {
        /* Get all groups and set states */
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

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, groupsList } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
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
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() => history.push(`/groups/new`)}
                            >
                                <h2>New Group</h2>
                            </button>
                        </h2>
                    </div>

                    {groupsList !== undefined && groupsList.length > 0 ? (
                        <div>
                            <Row>
                                {groupsList.map((group, i) => (
                                    <div key={i}>
                                        <Col
                                            xs={{ span: 6 }}
                                            sm={{ span: 4 }}
                                            md={{ span: 3 }}
                                            lg={{ span: 2 }}
                                            xl={{ span: 1 }}
                                        >
                                            <div className="RecentGroupText">
                                                <span
                                                    className="dot"
                                                    onClick={() =>
                                                        history.push(
                                                            `/groups/details/?id=${group._id}`
                                                        )
                                                    }
                                                >
                                                    <h2>{group.name}</h2>
                                                    <h1>
                                                        {group.members.length}
                                                    </h1>
                                                </span>
                                            </div>
                                        </Col>
                                    </div>
                                ))}
                            </Row>
                        </div>
                    ) : (
                        <h3>No group available</h3>
                    )}
                </div>
            );
        }
    }
}

/* Export component */
export default groupView;

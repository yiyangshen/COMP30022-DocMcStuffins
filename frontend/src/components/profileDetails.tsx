/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import Nav from "./nav";
import { getUserProfile } from "../api/userApi";
import { IUser } from "../interfaces";

/* Component to profile */
class profile extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        user: {} as IUser,
    };

    /* During loading page */
    async componentDidMount() {
        /* Get user profile and set the states */
        getUserProfile().then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    user: data,
                });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, user } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No user found</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <><Nav />
                <div className="frame-pages">
                    <div className="title">
                        <h1>
                            <b>Profile</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() => history.push(`/user/profile/amend`)}
                            >
                                <h2>Edit</h2>
                            </button>
                        </h1>
                    </div>

                    <h2>Name</h2>
                    <div className="display-content white cut-40">
                        <p>
                            {user.name.first} {user.name.middle}{" "}
                            {user.name.last}
                        </p>
                    </div>

                    <h2>Email</h2>
                    <div className="display-content white cut-40">
                        <p>{user.email}</p>
                    </div>

                    <h2>Password</h2>
                    <div className="display-content white cut-40">
                        <p>*******</p>
                    </div>
                </div></>
            );
        }
    }
}

/* Export component */
export default profile;

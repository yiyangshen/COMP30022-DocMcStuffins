/* Import the required libraries and types */
import React from "react";

/* Import the required libraries and types */
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
                <div className="frame-pages">
                    <div className="title">
                        <h1>
                            <b>Profile</b>
                        </h1>
                    </div>

                    <div className="box">
                        <div className="boxLeft">
                            <label>Name</label>
                            <div className="box, white">
                                <h2>
                                    {user.name.first} {user.name.middle}{" "}
                                    {user.name.last}
                                </h2>
                            </div>

                            <label>Email</label>
                            <div className="box white">
                                <h2>{user.email}</h2>
                            </div>
                        </div>
                        <label>Password</label>
                        <div className="box, white">
                            <h2>*******</h2>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

/* Export component */
export default profile;

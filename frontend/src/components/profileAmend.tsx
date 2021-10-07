/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getUserProfile } from "../api/userApi";

/* Component to profile */
class profile extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* Handle when click on save button */
    handleSave = (event: { preventDefault: () => void }) => {
        const {
            // firstName,
            // middleName,
            // lastName,
            // email,
            password,
            confirmPassword,
        } = this.state;
        event.preventDefault();

        /* Register user then push new entry to history */
        if (password === confirmPassword) {
            /* PUT FUNCTION HERE */
        } else {
            alert("Please enter the same password");
        }
    };

    /* Render the component to the screen */
    render() {
        const {
            error,
            isLoaded,
            firstName,
            middleName,
            lastName,
            email,
            password,
            confirmPassword,
        } = this.state;

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
                            <b>Edit Profile</b>
                        </h1>
                    </div>

                    <h2>Name</h2>
                    <input
                        type="text"
                        id="fullName"
                        name="firstName"
                        defaultValue={firstName}
                        placeholder="First Name"
                        onChange={this.handleChange}
                        className="display-content grey"
                        required
                    />
                    <input
                        type="text"
                        id="fullName"
                        name="middleName"
                        defaultValue={middleName}
                        placeholder="Middle Name"
                        onChange={this.handleChange}
                        className="display-content grey"
                    />
                    <input
                        type="text"
                        id="fullName"
                        name="lastName"
                        defaultValue={lastName}
                        placeholder="Last Name"
                        onChange={this.handleChange}
                        className="display-content grey"
                        required
                    />

                    <h2>Email</h2>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Eg. JohnDoe@gmail.com"
                        defaultValue={email}
                        onChange={this.handleChange}
                        className="display-content grey"
                        required
                    />

                    <h2>Password</h2>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="*******"
                        defaultValue={password}
                        onChange={this.handleChange}
                        className="display-content grey"
                        required
                    />

                    <h2>Confirm Password</h2>
                    <input
                        id="conpassword"
                        type="password"
                        name="confirmPassword"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        className="display-content grey"
                        required
                    />
                    <button
                        className="base-button"
                        type="button"
                        onClick={() => history.goBack()}
                    >
                        <h2>Cancel</h2>
                    </button>
                    <button className="base-button" type="submit">
                        <h2>Save</h2>
                    </button>
                </div>
            );
        }
    }
}

/* Export component */
export default profile;

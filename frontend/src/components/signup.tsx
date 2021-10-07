/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";

/* Import components */
import { registerUser } from "../api/userApi";
import SignUpLogo from "../img/signUpLogo.svg";
/* Component for Sign Up */
class Signup extends React.Component {
    /* Declare states */
    state = {
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password,
            confirmPassword,
        } = this.state;
        event.preventDefault();

        /* Register user then push new entry to history */
        if (password === confirmPassword) {
            registerUser(firstName, middleName, lastName, email, password);
        } else {
            alert("Please enter the same password");
        }
    };

    /* Render the component to the screen */
    render() {
        const {
            firstName,
            middleName,
            lastName,
            email,
            password,
            confirmPassword,
        } = this.state;

        return (
            <div className="frame-pages">
                <div className="SBox2">
                    <div className="SBox">
                        <h1>Sign Up</h1>
                        <p>Already have an account? </p>
                        <Link to="#" onClick={() => history.push(`/signin`)}>
                            <p>Sign In here.</p>
                        </Link>

                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <p>First Name</p>
                                <input
                                    id="name"
                                    type="text"
                                    name="firstName"
                                    placeholder="first name"
                                    value={firstName}
                                    onChange={this.handleChange}
                                    required
                                />

                                <p>Middle Name</p>
                                <input
                                    id="name"
                                    type="text"
                                    name="middleName"
                                    placeholder="middle name"
                                    value={middleName}
                                    onChange={this.handleChange}
                                />

                                <p>Last Name</p>
                                <input
                                    id="name"
                                    type="text"
                                    name="lastName"
                                    placeholder="last name"
                                    value={lastName}
                                    onChange={this.handleChange}
                                />

                                <p>Email</p>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    required
                                />

                                <p>Password</p>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />

                                <p>Confirm Password</p>
                                <input
                                    id="conpassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="confirm password"
                                    value={confirmPassword}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button className="signInButton" type="submit">
                                    <h2>Sign Up</h2>
                                </button>
                            </form>
                        </div>
                    </div>
                    <img className="signInLogo" src={SignUpLogo} alt="logo" />
                </div>
            </div>
        );
    }
}

/* Export component */
export default Signup;

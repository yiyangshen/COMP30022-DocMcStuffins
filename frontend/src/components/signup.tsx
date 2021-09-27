/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";

/* Import components */
import "../css/signin.css";
import history from "../history";
import { registerUser } from "../api/userApi";

/* Component for Sign Up */
class Signup extends React.Component {
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

        /* Register user. Then push new entry to history */
        if (password === confirmPassword) {
            registerUser(firstName, middleName, lastName, email, password);
        } else {
            alert("Please enter the same password");
        }
    };

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
            <div className="border">
                <div>
                    <h1>Sign Up</h1>
                    <p>Already have an account? </p>
                    <Link to="#" onClick={() => history.push(`/signin`)}>
                        <p>Sign In here.</p>
                    </Link>
                </div>
                <br />

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <p>First Name</p>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="name"
                            value={firstName}
                            onChange={this.handleChange}
                            required
                        />

                        <p>Middle Name</p>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="name"
                            value={middleName}
                            onChange={this.handleChange}
                        />

                        <p>Last Name</p>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="name"
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
                            name="conpassword"
                            placeholder="password"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            required
                        />

                        <br />
                        <br />

                        <button className="base-button" type="submit">
                            <h2>Sign In</h2>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;

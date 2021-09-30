/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";

/* Import components */
import "../css/signin.css";
import { loginUser } from "../api/userApi";

/* Component for Sign In */
class Signin extends React.Component {
    /* Declare states */
    state = {
        email: "",
        password: "",
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { email, password } = this.state;
        event.preventDefault();

        /* Login user then push new entry to history */
        loginUser(email, password);
    };

    /* Render the component to the screen */
    render() {
        const { email, password } = this.state;

        return (
            <div className="border">
                <div>
                    <h1>Sign In</h1>
                    <p>Don't have an account? </p>
                    <Link to="#" onClick={() => history.push(`/register`)}>
                        <p>Create one here.</p>
                    </Link>
                </div>
                <br />

                <div>
                    <form onSubmit={this.handleSubmit}>
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

/* Export component */
export default Signin;

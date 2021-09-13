/* Import the required libraries and types */
import React from "react";

/* Import components */
import "../css/signin.css";
import history from "../history";

/* Component for Sign In */
class Signin extends React.Component {
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
        event.preventDefault();
        history.push("/dashboard");
    };

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <div>
                    <h1>Sign In</h1>
                    <p>Don't have an account? </p>
                    <button
                        className="base-button"
                        type="button"
                        onClick={() => history.push(`/signup`)}
                    >
                        <p>Create one here.</p>
                    </button>
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

                        <button className="base-button" type="submit">
                            <h2>Sign In</h2>
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;

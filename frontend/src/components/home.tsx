/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Component for home */
class home extends React.Component {
    /* Render the component to the screen */
    render() {
        return (
            <div className="border">
                <h1>Welcome to Comp 30023</h1>
                <br />
                <span className="landingbtn">
                    <button
                        className="base-button"
                        type="button"
                        onClick={() => history.push(`/signin`)}
                    >
                        <h2>Sign In</h2>
                    </button>
                    <button
                        className="base-button"
                        type="button"
                        onClick={() => history.push(`/register`)}
                    >
                        <h2>Sign Up</h2>
                    </button>
                </span>
            </div>
        );
    }
}

/* Export component */
export default home;

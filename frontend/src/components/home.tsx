/* Import the required libraries and types */
import React from "react";
import history from "../history";
import WelcomeLogo from "../img/Welcome.svg";
import Gay from "../img/Gay.svg";
/* Component for home */
class home extends React.Component {
    /* Render the component to the screen */
    render() {
        return (
            <div className="center-pages">
                <div className="WelcomeBox">
                    <h1>Welcome to Futaba's Friday</h1>
                    <img className="welcomeLogo" src={WelcomeLogo} alt="logo" />
                    <div className="buttons">
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
                    </div>
                </div>
                
            </div>
        );
    }
}

/* Export component */
export default home;

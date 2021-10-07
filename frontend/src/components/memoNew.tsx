/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import components */
import { createMemo } from "../api/memoApi";

/* Component for new memo */
class memoNew extends React.Component {
    /* Declare states */
    state = {
        title: "",
        notes: "",
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { title, notes } = this.state;
        event.preventDefault();

        /* Create memo then push new entry to history */
        createMemo(title, notes);
    };

    /* Render the component to the screen */
    render() {
        const { title, notes } = this.state;

        return (
            <div className="frame-pages">
                <h1>Add Memo</h1>
                <form onSubmit={this.handleSubmit}>
                    <h2>Name</h2>
                    <input
                        type="text"
                        id="memoName"
                        name="title"
                        value={title}
                        placeholder="Eg. Groceries"
                        onChange={this.handleChange}
                        className="display-content grey"
                    />
                    <h2>Description</h2>
                    <textarea
                        id="description"
                        name="notes"
                        value={notes}
                        placeholder="Write something.."
                        onChange={this.handleChange}
                        className="display-content grey"
                    ></textarea>
                    <button
                        className="base-button"
                        type="button"
                        onClick={() => history.push(`/memos`)}
                    >
                        <h2>Cancel</h2>
                    </button>
                    <button className="base-button" type="submit">
                        <h2>Submit</h2>
                    </button>
                </form>
            </div>
        );
    }
}

/* Export component */
export default memoNew;

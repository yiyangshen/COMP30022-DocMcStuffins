/* Import the required libraries and types */
import React from "react";
import history from "../history";
import "../css/newMemo.css";

/* Import the required libraries and types */
import { createMemo } from "../api/memoApi";

class newMemo extends React.Component {
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

        /* Create memo. Then push new entry to history */
        createMemo(title, notes);
    };

    render() {
        const { title, notes } = this.state;

        return (
            <div className="border">
                <h1>Add Memo</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        id="memoName"
                        name="title"
                        value={title}
                        placeholder="Eg. Groceries"
                        onChange={this.handleChange}
                    />
                    <label>Description</label>
                    <textarea
                        id="description"
                        name="notes"
                        value={notes}
                        placeholder="Write something.."
                        onChange={this.handleChange}
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

export default newMemo;

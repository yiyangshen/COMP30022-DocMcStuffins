/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import components */
import { getMemoDetails, deleteMemo, amendMemoDetails } from "../api/memoApi";
import { getId } from "../api/userApi";

/* Component for memo detail */
class memoDetail extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        id: "",
        title: "",
        notes: "",
    };

    /* Extract id from the url */
    memoId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        /* Get memo details and set the states */
        getMemoDetails(this.memoId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    id: this.memoId,
                    title: data.title,
                    notes: data.notes,
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

    /* Handle when click on delete button */
    handleDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        /* Delete memo then push new entry to history */
        deleteMemo(this.memoId);
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { id, title, notes } = this.state;
        event.preventDefault();

        /* Amend memo details then push new entry to history */
        amendMemoDetails(id, title, notes);
    };

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, title, notes } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Memo Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <h1>Edit Memo</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            id="memo.title"
                            name="title"
                            value={title}
                            placeholder={title}
                            onChange={this.handleChange}
                        />
                        <label>Description</label>
                        <textarea
                            id="memo.notes"
                            name="notes"
                            value={notes}
                            placeholder={notes}
                            onChange={this.handleChange}
                        ></textarea>
                        <button
                            className="base-button"
                            type="button"
                            onClick={() => history.goBack}
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
}

/* Export component */
export default memoDetail;

/* Import the required libraries and types */
import React from "react";
import "../css/newMemo.css";
import history from "../history";

/* Import the required libraries and types */
import { getMemoDetails, deleteMemo, amendMemoDetails } from "../api/memoApi";
import { getId } from "../api/userApi";
import { IMemo } from "../interfaces";

/* Component to memo detail */
class memoDetail extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        memo: {} as IMemo,
    };

    memoId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        getMemoDetails(this.memoId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    memo: data,
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
        this.setState({
            ...this.state.memo,
            [event.target.name]: event.target.value,
        });
    };

    /* Handle when click on delete button */
    handleDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        /* delete memo. Then push new entry to history */
        deleteMemo(this.memoId);
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { memo } = this.state;
        event.preventDefault();

        /* Create memo. Then push new entry to history */
        amendMemoDetails(memo._id, memo.title, memo.notes);
    };

    render() {
        const { error, isLoaded, memo } = this.state;

        if (error === true) {
            return <h3 className="error">No Memo Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <h1>Edit Memo</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>Name</label>
                        <input
                            type="text"
                            id="memo.title"
                            name="memo.title"
                            value={memo.title}
                            placeholder={memo.title}
                            onChange={this.handleChange}
                        />
                        <label>Description</label>
                        <textarea
                            id="memo.notes"
                            name="memo.notes"
                            value={memo.notes}
                            placeholder={memo.notes}
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
}

export default memoDetail;

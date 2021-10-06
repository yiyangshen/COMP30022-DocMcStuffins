/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IMemo } from "../interfaces";

/* Import components */
import { getMemoDetails, deleteMemo } from "../api/memoApi";
import { getId } from "../api/userApi";

/* Component for memo detail */
class memoDetail extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        memo: {} as IMemo,
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
                    memo: data,
                });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Handle when click on delete button */
    handleDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        /* Delete memo then push new entry to history */
        deleteMemo(this.memoId);
    };

    /* Render the component to the screen */
    render() {
        const { error, isLoaded, memo } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No MemoPresent</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <div className="title">
                        <h2>
                            <b>Memo Details</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() =>
                                    history.push(
                                        `/memos/details/amend/?id=${this.memoId}`
                                    )
                                }
                            >
                                <h2>Edit</h2>
                            </button>
                        </h2>
                    </div>
                    <h2>Name</h2>
                    <div className="display-content white cut-30">
                        <p>{memo.title}</p>
                    </div>
                    <h2>Description</h2>
                    <div className="display-content white">
                        <p>{memo.notes}</p>
                    </div>

                    <button
                        className="base-button"
                        type="button"
                        onClick={this.handleDelete}
                    >
                        <h2>Delete</h2>
                    </button>
                </div>
            );
        }
    }
}

/* Export component */
export default memoDetail;

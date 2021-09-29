/* Import the required libraries and types */
import React from "react";
import "../css/newMemo.css";
import history from "../history";

/* Import the required libraries and types */
import { getMemoDetails, deleteMemo } from "../api/memoApi";
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

    /* Handle when click on delete button */
    handleDelete = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        /* delete memo. Then push new entry to history */
        deleteMemo(this.memoId);
    };

    render() {
        const { error, isLoaded, memo } = this.state;

        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Memo Details</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() =>
                                    history.push(
                                        `/memos/details/ammend/?id=${this.memoId}`
                                    )
                                }
                            >
                                <h2>Edit</h2>
                            </button>
                        </h2>
                    </div>
                    <label>Name</label>
                    <div className="box, white">
                        <h2>{memo.title}</h2>
                    </div>
                    <label>Description</label>
                    <div className="box, white">
                        <h2>{memo.notes}</h2>
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

export default memoDetail;

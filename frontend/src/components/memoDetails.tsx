/* Import the required libraries and types */
import React from "react";
import "../css/newMemo.css";

/* Import the required libraries and types */
import { getMemoDetails } from "../api/memoApi";
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

    render() {
        const { error, isLoaded, memo } = this.state;

        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <h1>Memo Details</h1>
                    <label>Name</label>
                    <div className="box, white">
                        <h2>{memo.title}</h2>
                    </div>
                    <label>Description</label>
                    <div className="box, white">
                        <h2>{memo.notes}</h2>
                    </div>
                </div>
            );
        }
    }
}

export default memoDetail;

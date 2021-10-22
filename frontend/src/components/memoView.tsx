/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IMemo } from "../interfaces";

/* Import components */
import { getMemos } from "../api/memoApi";
import Memo from "../img/Group 5.svg";

/* Component for view memos */
class memoView extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        memosList: [] as IMemo[],
    };

    /* During loading page */
    async componentDidMount() {
        /* Get all memos and set states */
        getMemos().then(
            (response) => {
                var data = response.data.data;
                this.setState({ memosList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }
    /* Render the component to the screen */
    render() {
        const { error, isLoaded, memosList } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Memo Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <div className="title">
                        <h1>
                            <b>Memos</b>
                            <button
                                className="base-button top-right"
                                type="button"
                                onClick={() => history.push(`/memos/new`)}
                            >
                                <h2>New Memo</h2>
                            </button>
                        </h1>
                    </div>

                    {memosList !== undefined && memosList.length > 0 ? (
                        <div className="grid-container">
                            {memosList.map((memo, i) => (
                                <div key={i}>
                                    <div className="MemoPage">
                                        <img
                                            className="MemoPng"
                                            src={Memo}
                                            alt="logo"
                                            onClick={() =>
                                                history.push(
                                                    `/memos/details/?id=${memo._id}`
                                                )
                                            }
                                        />
                                        <h2 className="MemoText">
                                            {memo.title}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h3>No memo available</h3>
                    )}
                </div>
            );
        }
    }
}

/* Export component */
export default memoView;

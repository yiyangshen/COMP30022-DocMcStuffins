/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import the required libraries and types */
import { getMemos } from "../api/memoApi";
import { IMemo } from "../interfaces";
import Memo from "../img/Group 5.svg";
import { Col, Row } from "react-bootstrap";

/* Component to view memos */
class ViewMemos extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        memosList: [] as IMemo[],
    };

    /* During loading page */
    async componentDidMount() {
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

    render() {
        const { error, isLoaded, memosList } = this.state;

        if (error === true) {
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <div className="title">
                        <h2>
                            <b>Memos</b>
                        </h2>
                    </div>

                    {memosList !== undefined && memosList.length > 0 ? (
                        <div>
                            <Row>
                                {memosList.map((memo, i) => (
                                    <div key={i}>
                                        <Col
                                            xs={{ span: 6 }}
                                            sm={{ span: 4 }}
                                            md={{ span: 3 }}
                                            lg={{ span: 2 }}
                                            xl={{ span: 1 }}
                                        >
                                            <div className="MemoPage">
                                                <img
                                                    className="MemoPng"
                                                    src={Memo}
                                                    alt="logo"
                                                    onClick={() =>
                                                        history.push(
                                                            `/memos/detail/?id=${memo.userId}`
                                                        )
                                                    }
                                                />
                                                <h2 className="MemoText">
                                                    {memo.title}
                                                </h2>
                                            </div>
                                        </Col>
                                    </div>
                                ))}
                            </Row>
                        </div>
                    ) : (
                        <h3>No memo available</h3>
                    )}
                </div>
            );
        }
    }
}

export default ViewMemos;

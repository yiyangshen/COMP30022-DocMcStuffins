/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IGroup, IMemo } from "../interfaces";

/* Import components */
import Memo from "../img/Group 5.svg";
import MemoMore from "../img/RecentMemoMore.svg";
import Contact from "../img/Profile.svg";
import Group from "../img/3 User.svg";
import { getRecentMemos } from "../api/memoApi";
import { getGroupCount, getGroups } from "../api/groupApi";
import { getContactCount } from "../api/contactApi";
import { getUserProfile } from "../api/userApi";

/* Component for dashboard */
class dashboard extends React.Component {
    /* Declare state */
    state = {
        error: null,
        isLoaded: false,
        memoList: [] as IMemo[],
        recentGroupList: [] as IGroup[],
        groupCount: 0,
        contactCount: 0,
        username: "",
    };

    /* During loading page */
    async componentDidMount() {
        /* Get user profile and set the states */
        getUserProfile().then(
            (response) => {
                var data = response.data.data.name.first;
                this.setState({ username: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );

        /* Get top 5 recent memos and set the states */
        getRecentMemos(5).then(
            (response) => {
                var data = response.data.data;
                this.setState({ memoList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );

        /* Get groups and set the states */
        getGroups().then(
            (response) => {
                var data = response.data.data;
                this.setState({ recentGroupList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );

        /* Get group count and set the states */
        getGroupCount().then(
            (response) => {
                var data = response.data.data;
                this.setState({ groupCount: data, isLoaded: true });
                console.log(response);
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );

        /* Get contact count and set the states */
        getContactCount().then(
            (response) => {
                var data = response.data.data;
                this.setState({ contactCount: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Render the component to the screen */
    render() {
        const {
            error,
            isLoaded,
            memoList,
            recentGroupList,
            groupCount,
            contactCount,
            username,
        } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">Internal Error</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <h1>Hi {username}!</h1>

                    <div className="MemoBox">
                        <h2>Memos</h2>
                        <div className="Memos">
                            {memoList !== undefined && memoList.length > 0 ? (
                                <div>
                                    {memoList.map((memos, i) => (
                                        <div key={i}>
                                            {" "}
                                            <div className="MemoPage">
                                                <img
                                                    className="MemoPng"
                                                    src={Memo}
                                                    alt="logo"
                                                    onClick={() =>
                                                        history.push(
                                                            `/memos/details/?id=${memos._id}`
                                                        )
                                                    }
                                                />
                                                <h2 className="MemoText">
                                                    {memos.title}
                                                </h2>
                                            </div>
                                        </div>
                                    ))}{" "}
                                </div>
                            ) : null}
                            <div className="MemoPage">
                                <img
                                    className="AddMoreMemo"
                                    src={MemoMore}
                                    alt="logo"
                                    onClick={() => history.push(`/memos/new`)}
                                />
                                <h2 className="MemoText">Add More...</h2>
                            </div>
                        </div>
                    </div>

                    <div className="Dbox">
                        <div className="Dbox2">
                            <div
                                className="Group"
                                onClick={() => history.push(`/groups`)}
                            >
                                <img
                                    className="GroupPng"
                                    src={Group}
                                    alt="logo"
                                />
                                <div className="container">
                                    <h3>Group</h3>
                                    <h2>{groupCount}</h2>
                                </div>
                            </div>

                            <div
                                className="Contacts"
                                onClick={() => history.push(`/contacts`)}
                            >
                                <img
                                    className="ContactsPng"
                                    src={Contact}
                                    alt="logo"
                                />
                                <div className="Contactscontainer">
                                    <h3>Contacts</h3>
                                    <h2>{contactCount.valueOf()}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="RecentGroupsBox">
                            <h2>Recent Groups</h2>
                            <div className="RecentGroups">
                                {recentGroupList !== undefined &&
                                recentGroupList.length > 0 ? (
                                    <div>
                                        {recentGroupList.map((group, i) => (
                                            <div key={i}>
                                                {" "}
                                                <span
                                                    className="dot"
                                                    onClick={() =>
                                                        history.push(
                                                            `/groups/details/?id=${group._id}`
                                                        )
                                                    }
                                                >
                                                    <div className="RecentGroupText">
                                                        <h2>{group.name}</h2>
                                                        <h1>
                                                            {
                                                                group.members
                                                                    .length
                                                            }
                                                        </h1>
                                                    </div>
                                                </span>
                                            </div>
                                        ))}{" "}
                                    </div>
                                ) : null}
                                <span
                                    className="dotMore"
                                    onClick={() => history.push(`/groups/new`)}
                                >
                                    <h1 className="dotText">Add more...</h1>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

/* Export component */
export default dashboard;

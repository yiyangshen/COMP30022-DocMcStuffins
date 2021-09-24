/* Import the required libraries and types */
import React from "react";
import history from "../history";

/* Import components */
import "../css/Dashboard.css";
import Memo from "../img/Group 5.svg";
import Contact from "../img/Profile.svg";
import Group from "../img/3 User.svg";
import { getRecentMemos } from "../api/memoApi";
import { IGroup, IMemo } from "../interfaces";


class DashB extends React.Component{
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        memoList: [] as IMemo[],
        recentGroupList: [] as IGroup[],
    };
    /* During loading page */
    async componentDidMount() {
        getRecentMemos(5).then(
            (response) => {
                var data = response.data.items;
                this.setState({ memoList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }
    render() {
        const { error, isLoaded, memoList } = this.state; //defining constants 

        if (error === true) {
            return <h3 className="error">No Order Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else{
                return (
                    <div className="border">
                        <div className = "everything">
                            <h1>Yi Yiyang!</h1>

                            <div className = "Memos">
                                <h1>Memos</h1>
                                {memoList !== undefined &&
                                memoList.length > 0 ?
                                <div className = "MemoPage">
                                    <img className = "MemoPng" src={Memo} alt="logo" onClick={() => history.push(`/memos/id`)}/>
                                    <h2 className ="MemoText">Groceries</h2>
                                </div>
                                : <h1>No memos found</h1>
                                }
                            </div>
                            <div className="box">
                                <div className="box2">
                                    <div className ="Group" onClick={() => history.push(`/groups`)}>
                                        <img className = "GroupPng" src={Group} alt="logo"/>
                                        <div className="container" >
                                            <h1>Group</h1>
                                            <h2>6</h2>
                                        </div>
                                    </div>

                                    <div className ="Contacts" onClick={() => history.push(`/contacts`)}>
                                        <img className = "ContactsPng" src={Contact} alt="logo"/>
                                        <div  className="Contactscontainer" >
                                            <h1>Contacts</h1>
                                            <h2>6</h2>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className = "RecentGroups">
                                    <h1>Recent Groups</h1>
                                    <div className ="RecentGroup">
                                        <span className ="dot" onClick={() => history.push(`/groups/id`)}>
                                            <div className= "RecentGroupText">
                                                <h2>Family</h2>
                                                <h3>5</h3>
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                                
            
                            {/* <div className ="Group" onClick={() => history.push(`/groups`)}>
                                <img className = "GroupPng" src={Group} alt="logo"/>
                                <div className="container" >
                                    <h1>Group</h1>
                                    <h2>6</h2>
                                </div>
                            </div> */}
            
                            {/* <div className ="Contacts" onClick={() => history.push(`/contacts`)}>
                                <img className = "ContactsPng" src={Contact} alt="logo"/>
                                <div  className="Contactscontainer" >
                                    <h1>Contacts</h1>
                                    <h2>6</h2>
                                </div>
                            </div> */}


                        </div>
                    </div>
                );
            }
        }
}
export default DashB;



// export default function DashB() {
//     return (
//         <div className="border">
//             <div className = "everything">
//                 <h1>Yi Yiyang!</h1>
//                 <div className = "Memos">
//                     <h1>Memos</h1>
//                     <div className = "MemoPage">
//                         <img className = "MemoPng" src={Memo} alt="logo" onClick={() => history.push(`/memos/id`)}/>
//                         <h2 className ="MemoText">Groceries</h2>
//                     </div>
//                 </div>

//                 <div>
//                     <div className = "RecentGroups">
//                         <h1>Recent Groups</h1>
//                         <div className ="RecentGroup">
//                             <span className ="dot" onClick={() => history.push(`/groups/id`)}>
//                                 <div className= "RecentGroupText">
//                                     <h2>Family</h2>
//                                     <h3>5</h3>
//                                 </div>
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className ="Group" onClick={() => history.push(`/groups`)}>
//                     <img className = "GroupPng" src={Group} alt="logo"/>
//                     <div className="container" >
//                         <h1>Group</h1>
//                         <h2>6</h2>
//                     </div>
//                 </div>

//                 <div className ="Contacts" onClick={() => history.push(`/contacts`)}>
//                     <img className = "ContactsPng" src={Contact} alt="logo"/>
//                     <div  className="Contactscontainer" >
//                         <h1>Contacts</h1>
//                         <h2>6</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
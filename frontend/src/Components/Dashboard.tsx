/* Import the required libraries and types */
import history from "../history";

/* Import components */
import "../css/Dashboard.css";
import Memo from "../img/Group 5.svg";
import Contact from "../img/Profile.svg";
import Group from "../img/3 User.svg";
export default function DashB() {
    return (
        <div className = "everything">
            <h1>Yi Yiyang!</h1>
    
            <div className = "Memos">
                <h1>Memos</h1>
                <div className = "page">
                    <img className = "MemoPng" src={Memo} alt="logo" onClick={() => history.push(`/memos/id`)}/>
                    <h2 className ="MemoText">Groceries</h2>
                </div>
            </div>

            <div>
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
    );
}
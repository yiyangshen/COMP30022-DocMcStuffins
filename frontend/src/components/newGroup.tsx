/* Import the required libraries and types */
import React from "react";
import { Link} from "react-router-dom";
import "../css/newGroup.css";

class newMemo extends React.Component {
    render() {
        return (
            <div className="border">
                <h1>Add Group</h1>
                <div className="box">
                    <label>Name</label>
                    <input type="name" id="groupName" name="groupName" placeholder="Eg. Unimelb"/>
                    <div className="box1">
                        <label>Members</label>   
                        <input type="number" id="members" name="members" placeholder="Eg. 2"/>      
                        <Link to=".." className="addContact">add contact</Link>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr className="table-lable">
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>Name1</td> 
                        <td>Phone1</td>
                        <td>Email1</td>
                    </tbody>
                </table>

            </div>
    );
    }
}

export default newMemo;
/* Import the required libraries and types */
import React from "react";
import { Link} from "react-router-dom";
import "../css/newGroup.css";

class newMemo extends React.Component {
    render() {
        return (
            <div className="box">
                <h1>Add Group</h1>
                <div className="border">
                    <label>Name</label>
                    <input type="text" id="memoName" name="memoName" placeholder="Eg. Groceries"/>
                    <label>Description</label>
                    <textarea id="description" name="description" placeholder="Write something.."></textarea>
                    
                    <Link to=".." className="cancel">Cancel</Link>
                    <Link to=".." className="save">Save</Link>   
                </div>
            </div>
            
        );
    }
}

export default newMemo;
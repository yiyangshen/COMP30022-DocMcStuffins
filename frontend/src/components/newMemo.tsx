/* Import the required libraries and types */
import React from "react";
import { Link} from "react-router-dom";
import "../css/newMemo.css";

class newMemo extends React.Component {

    render() {
        return (
            <div className="border">
                <h1>Add Memo</h1>
                <label>Name</label>
                <input type="text" id="memoName" name="memoName" placeholder="Eg. Groceries"/>
                <label>Description</label>
                <textarea id="description" name="description" placeholder="Write something.."></textarea>
                
                <Link to=".." className="cancel">Cancel</Link>
                <Link to=".." className="save">Save</Link>   
            </div>
        );
    }
}

export default newMemo;
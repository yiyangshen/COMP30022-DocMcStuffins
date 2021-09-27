
/* Import the required libraries and types */
import React from "react";
import "../css/newContact.css";
class newContact extends React.Component {
    render() {
        return (
            <div className="border">
                <h1>Add contact</h1>
                
                <label>Name</label>
                <input type="text" id="fullName" name="fullName" placeholder="Eg. John Doe"/>
                <label>Gender</label>
                <select id="gender" name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Spoon</option>
                </select>
                <label>Country</label>
                <select id="country" name="country">
                    <option value="australia">Australia</option>
                    <option value="china">China</option>
                </select>
                <label >Email</label>
                <input type="text" id="email" name="email" placeholder="Eg. JohnDoe@gmail.com"/>
                <label>Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" placeholder="Eg. 0412563286"/>
                <label>Email</label>
                <input type="text" id="relationship" name="relationship" placeholder="Eg. Friends"/>
                <label>Email</label>
                <input type="text" id="firstContactTimestamp" name="firstContactTimestamp" placeholder="Eg. 3.15pm, 13 Aug 2091"/>
                <label>Assigned Group</label>
                <select id="assignedGroup" name="assignedGroup">
                    <option value="unimelb">Unimelb</option>
                </select>
                <label>Additional Notes</label>
                <textarea id="additionalNotes" name="additionalNotes" placeholder="Write something.."></textarea>

                <p>Click on the "Choose File" button to choose a picture:</p>
                <form action="/action_page.php">
                    <input type="file" id="myFile" name="filename"/>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default newContact;
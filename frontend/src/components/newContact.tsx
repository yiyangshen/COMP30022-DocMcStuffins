/* Import the required libraries and types */
import React from "react";
import Moment from "moment";
import "../css/newContact.css";

/* Import the required libraries and types */
import { createContact } from "../api/contactApi";

/* Component to new contacts */
class newContact extends React.Component {
    /* Declare states */
    state = {
        firstName: "",
        middleName: "",
        lastName: "",
        groupId: "",
        gender: "Other",
        dateOfBirth: "",
        lastMet: "",
        phoneNumber: "",
        email: "",
        photo: "",
        relationship: "",
        additionalNotes: "",
    };

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const {
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirth,
            lastMet,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        } = this.state;
        event.preventDefault();

        /* Create contact. Then push new entry to history */
        createContact(
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirth,
            lastMet,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes
        );
    };

    render() {
        const {
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirth,
            lastMet,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        } = this.state;

        return (
            <div className="border">
                <h1>Add contact</h1>
                <div className="box">
                    <form onSubmit={this.handleSubmit}>
                        <div className="boxLeft">
                            <label>Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="firstName"
                                value={firstName}
                                placeholder="Eg. John "
                                onChange={this.handleChange}
                            />
                            <input
                                type="text"
                                id="fullName"
                                name="lastName"
                                value={lastName}
                                placeholder="Eg. Doe"
                                onChange={this.handleChange}
                            />
                            <label>Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                onChange={this.handleChange}
                                value={gender}
                            >
                                <option key="Male" value="Male">
                                    Male
                                </option>
                                <option key="Female" value="Female">
                                    Female
                                </option>
                                <option key="Others" value="Others">
                                    Spoon
                                </option>
                            </select>
                            <label>Country</label>
                            <select id="country" name="country">
                                <option value="australia">Australia</option>
                                <option value="china">China</option>
                            </select>
                            <label>Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Eg. JohnDoe@gmail.com"
                                value={email}
                                onChange={this.handleChange}
                            />
                            <label>Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Eg. 0412563286"
                                value={phoneNumber}
                                onChange={this.handleChange}
                            />
                            <label>Relationship</label>
                            <input
                                type="text"
                                id="relationship"
                                name="relationship"
                                value={relationship}
                                placeholder="Eg. Friends"
                                onChange={this.handleChange}
                            />
                            <label>First Contact Timestamp</label>
                            <input
                                type="text"
                                id="firstContactTimestamp"
                                name="lastMet"
                                placeholder="Eg. 3.15pm, 13 Aug 2091"
                                value={lastMet}
                                onChange={this.handleChange}
                            />
                            <label>Assigned Group</label>
                            <select
                                id="assignedGroup"
                                name="groupId"
                                value={groupId}
                                onChange={this.handleChange}
                            >
                                <option value="unimelb">Unimelb</option>
                            </select>
                        </div>

                        <div className="boxRight">
                            <label>Additional Notes</label>
                            <textarea
                                id="additionalNotes"
                                name="contact.additionalNotes"
                                placeholder="Write something.."
                                value={additionalNotes}
                                onChange={this.handleChange}
                            ></textarea>

                            <p>
                                Click on the "Choose File" button to choose a
                                picture:
                            </p>
                            <form action="/action_page.php">
                                <input
                                    type="file"
                                    id="myFile"
                                    name="filename"
                                />
                            </form>
                            <input type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default newContact;

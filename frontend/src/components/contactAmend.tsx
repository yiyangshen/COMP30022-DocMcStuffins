/* Import the required libraries and types */
import React from "react";
import "../css/newContact.css";
import history from "../history";

/* Import the required libraries and types */
import {
    getContactDetails,
    createContact,
    deleteContact,
} from "../api/contactApi";
import { getId } from "../api/userApi";

/* Component to contact details */
class contactAmend extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        firstName: "",
        middleName: "",
        lastName: "",
        groupId: "",
        gender: "Other",
        dateOfBirthData: "",
        lastMet: "",
        lastMetData: "",
        phoneNumber: "",
        email: "",
        photo: "",
        relationship: "",
        additionalNotes: "",
    };

    contactId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        getContactDetails(this.contactId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                this.setState({
                    isLoaded: true,
                    firstName: data.name.first,
                    middleName: data.name.middle,
                    lastName: data.name.last,
                    groupId: data.groupId,
                    gender: data.gender,
                    dateOfBirthData: data.dateOfBirthData,
                    lastMet: data.lastMet,
                    lastMetData: data.lastMetData,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    photo: data.photo,
                    relationship: data.relationship,
                    additionalNotes: data.additionalNotes,
                });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };
    /* Handle when click on save button */
    handleSave = (event: { preventDefault: () => void }) => {
        const {
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirthData,
            lastMetData,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        } = this.state;
        event.preventDefault();
        var dateOfBirth = new Date(dateOfBirthData);
        var lastMet = new Date(lastMetData);
        deleteContact(this.contactId);
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
        // deleteContact(this.contactId);
    };

    render() {
        const {
            error,
            isLoaded,
            firstName,
            middleName,
            lastName,
            groupId,
            gender,
            dateOfBirthData,
            lastMetData,
            phoneNumber,
            email,
            photo,
            relationship,
            additionalNotes,
        } = this.state;

        if (error === true) {
            return <h3 className="error">No Contact Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <h1>Edit contact</h1>
                    <div className="box">
                        <form onSubmit={this.handleSave}>
                            <div className="boxLeft">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="firstName"
                                    defaultValue={firstName}
                                    placeholder="Eg. John "
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="lastName"
                                    defaultValue={lastName}
                                    placeholder="Eg. Doe"
                                    onChange={this.handleChange}
                                />
                                <label>Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={this.handleChange}
                                    defaultValue={gender}
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
                                    defaultValue={email}
                                    onChange={this.handleChange}
                                />
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Eg. 0412563286"
                                    defaultValue={phoneNumber}
                                    onChange={this.handleChange}
                                />
                                <label>Relationship</label>
                                <input
                                    type="text"
                                    id="relationship"
                                    name="relationship"
                                    defaultValue={relationship}
                                    placeholder="Eg. Friends"
                                    onChange={this.handleChange}
                                />
                                <label>First Contact Timestamp</label>
                                <input
                                    type="text"
                                    id="firstContactTimestamp"
                                    name="lastMetData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2091"
                                    defaultValue={lastMetData}
                                    onChange={this.handleChange}
                                />
                                <label>Assigned Group</label>
                                <select
                                    id="assignedGroup"
                                    name="groupId"
                                    defaultValue={groupId}
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
                                    defaultValue={additionalNotes}
                                    onChange={this.handleChange}
                                ></textarea>

                                <p>
                                    Click on the "Choose File" button to choose
                                    a picture:
                                </p>
                                <form action="/action_page.php">
                                    <input
                                        type="file"
                                        id="myFile"
                                        name="filename"
                                    />
                                </form>
                                <button
                                    className="base-button"
                                    type="button"
                                    onClick={() => history.push(`/contacts`)}
                                >
                                    <h2>Cancel</h2>
                                </button>
                                <button className="base-button" type="submit">
                                    <h2>Submit</h2>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

export default contactAmend;

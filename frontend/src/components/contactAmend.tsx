/* Import the required libraries and types */
import React from "react";
import history from "../history";
import moment from "moment";
import { IGroup } from "../interfaces";

/* Import components */
import { getContactDetails, amendContactDetails } from "../api/contactApi";
import { getId } from "../api/userApi";
import { getGroups } from "../api/groupApi";
import "../css/newContact.css";

/* Component for amending a contact */
class contactAmend extends React.Component {
    /* Declare states */
    state = {
        error: null,
        isLoaded: false,
        firstName: "",
        middleName: "",
        lastName: "",
        groupId: "",
        gender: "Other",
        dateOfBirthData: "",
        lastMetData: "",
        phoneNumber: "",
        email: "",
        photo: "",
        relationship: "",
        additionalNotes: "",
        groupsList: [] as IGroup[],
    };

    /* Extract id from the url */
    contactId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        /* Get contact details and set the states */
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
                    dateOfBirthData: moment(data.dateOfBirth).format(
                        "DD MMM YYYY"
                    ),
                    lastMetData: moment(data.lastMet).format("DD MMM YYYY"),
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

        /* Get all groups and set states */
        await getGroups().then(
            (response) => {
                var data = response.data.data;
                this.setState({ groupsList: data, isLoaded: true });
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

        let dateOfBirth = new Date(-8640000000000000);
        let lastMet = new Date(-8640000000000000);

        if (dateOfBirthData !== "") {
            dateOfBirth = new Date(dateOfBirthData);
        }
        if (lastMetData !== "") {
            lastMet = new Date(lastMetData);
        }

        /* Amend contact details then push new entry to history */
        amendContactDetails(
            this.contactId,
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

    /* Render the component to the screen */
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
            groupsList,
        } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
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
                                    name="middleName"
                                    defaultValue={middleName}
                                    placeholder="Eg. Mid "
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
                                    <option key="Other" value="Other">
                                        Other
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
                                <label>Date of Birth</label>
                                <input
                                    type="text"
                                    id="dateOfBirth"
                                    name="dateOfBirthData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2001"
                                    defaultValue={dateOfBirthData}
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
                                    value={groupId}
                                    placeholder={groupId}
                                    onChange={this.handleChange}
                                >
                                    <option value=" ">None</option>
                                    {groupsList.map((group, i) => (
                                        <option key={i} value={group._id}>
                                            {group.name}
                                        </option>
                                    ))}
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
                                        name="photo"
                                        value={photo}
                                        onChange={this.handleChange}
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

/* Export component */
export default contactAmend;

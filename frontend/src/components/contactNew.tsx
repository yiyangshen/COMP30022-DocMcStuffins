/* Import the required libraries and types */
import React from "react";
import history from "../history";
import { IGroup } from "../interfaces";

/* Import components */
import { createContact } from "../api/contactApi";
import { getGroups } from "../api/groupApi";

/* Component for new contacts */
class contactNew extends React.Component {
    /* Declare states */
    state = {
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
        groupsList: [] as IGroup[],
        error: null,
        isLoaded: false,
    };

    /* During loading page */
    async componentDidMount() {
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
        console.log(this.state.groupId);
    };

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
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

        /* Create contact then push new entry to history */
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

    /* Render the component to the screen */
    render() {
        const {
            isLoaded,
            error,
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
            return <h3 className="error">No Group Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <h1>Add contact</h1>

                    <form onSubmit={this.handleSubmit}>
                        <div className="grid-container-contacts">
                            <div>
                                <h2>Name*</h2>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="firstName"
                                    value={firstName}
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <input
                                    type="text"
                                    id="fullName"
                                    name="middleName"
                                    value={middleName}
                                    placeholder="Middle Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <input
                                    type="text"
                                    id="fullName"
                                    name="lastName"
                                    value={lastName}
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <h2>Gender</h2>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value={gender}
                                    className="display-content grey"
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

                                <h2>Country</h2>
                                <select
                                    id="country"
                                    name="country"
                                    className="display-content grey"
                                >
                                    <option value="australia">Australia</option>
                                    <option value="china">China</option>
                                </select>

                                <h2>Email</h2>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Eg. JohnDoe@gmail.com"
                                    value={email}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <h2>Phone Number</h2>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Eg. 0412563286"
                                    value={phoneNumber}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                            </div>
                            <div>
                                <h2>Relationship</h2>
                                <input
                                    type="text"
                                    id="relationship"
                                    name="relationship"
                                    value={relationship}
                                    placeholder="Eg. Friends"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <h2>Date of Birth</h2>
                                <input
                                    type="text"
                                    id="dateOfBirth"
                                    name="dateOfBirthData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2001"
                                    value={dateOfBirthData}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                                <h2>First Contact Timestamp</h2>
                                <input
                                    type="text"
                                    id="firstContactTimestamp"
                                    name="lastMetData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2091"
                                    value={lastMetData}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                                <h2>Assigned Group</h2>
                                <select
                                    id="assignedGroup"
                                    name="groupId"
                                    value={groupId}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                >
                                    <option value=" ">None</option>
                                    {groupsList.map((group, i) => (
                                        <option value={group._id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>

                                <h2>Additional Notes</h2>
                                <input
                                    type="text"
                                    id="additionalNotes"
                                    name="contact.additionalNotes"
                                    placeholder="Write something.."
                                    value={additionalNotes}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

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
                                        className="display-content grey"
                                    />
                                </form>
                                <div>
                                    <button
                                        className="base-button"
                                        type="button"
                                        onClick={() =>
                                            history.push(`/contacts`)
                                        }
                                    >
                                        <h2>Cancel</h2>
                                    </button>
                                    <button
                                        className="base-button"
                                        type="submit"
                                    >
                                        <h2>Submit</h2>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

/* Export component */
export default contactNew;

/* Import the required libraries and types */
import React from "react";
import history from "../history";
import moment from "moment";
import { IGroup } from "../interfaces";
import Resizer from "react-image-file-resizer";

/* Import components */
import { getContactDetails, amendContactDetails } from "../api/contactApi";
import { getId } from "../api/userApi";
import { getGroups } from "../api/groupApi";

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
        relationship: "",
        additionalNotes: "",
        groupsList: [] as IGroup[],
        file: "" as any,
        photo: "" as any,
        groupName: "",
        removePic: "" as any,
    };

    /* Extract id from the url */
    contactId = getId() || "";

    /* During loading page */
    async componentDidMount() {
        this.setState({ photo: undefined });

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
                    groupId: data.groupId?._id,
                    groupName: data.groupId?.name,
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    photo: data.photo,
                    relationship: data.relationship,
                    additionalNotes: data.additionalNotes,
                });

                /* Check if there is a content */
                if (
                    moment(data.dateOfBirth).format("DD MMM YYYY") !==
                    "20 Apr -271821"
                ) {
                    this.setState({
                        dateOfBirthData: moment(data.dateOfBirth).format(
                            "DD MMM YYYY"
                        ),
                    });
                }

                if (
                    moment(data.lastMet).format("DD MMM YYYY") !==
                    "20 Apr -271821"
                ) {
                    this.setState({
                        lastMetData: moment(data.lastMet).format("DD MMM YYYY"),
                    });
                }
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

    /* Capture change of picture */
    onChange = (event: { target: any }) => {
        var fileInput = false;
        if (event.target.files[0]) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    event.target.files[0],
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        if (typeof uri === "string") {
                            this.setState({
                                photo: uri.replace(
                                    "data:image/jpeg;base64,",
                                    ""
                                ),
                            });
                        }
                    },
                    "base64",
                    200,
                    200
                );
            } catch (err) {
                console.log(err);
            }
        }
    };

    removeImage = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        let randomString = Math.random().toString(36);
        this.setState({ photo: undefined, removePic: randomString });
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
        if (photo === undefined) {
            this.setState({ photo: "" });
        }
        if (groupId === "None") {
            this.setState({ groupId: "" });
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
            groupName,
            removePic,
        } = this.state;

        /* Checks if it returns an error, still loading, or has a value accordingly */
        if (error === true) {
            return <h3 className="error">No Contact Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="frame-pages">
                    <h1>Edit contact</h1>

                    <form onSubmit={this.handleSave}>
                        <div className="grid-container-contacts">
                            <div>
                                <h2>Name*</h2>

                                <input
                                    type="text"
                                    id="fullName"
                                    name="firstName"
                                    defaultValue={firstName}
                                    placeholder="First Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                    required
                                />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="middleName"
                                    defaultValue={middleName}
                                    placeholder="Middle Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="lastName"
                                    defaultValue={lastName}
                                    placeholder="Last Name"
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                    required
                                />

                                <h2>Gender</h2>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={this.handleChange}
                                    defaultValue={gender}
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
                                    defaultValue={email}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <h2>Phone Number</h2>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Eg. 0412563286"
                                    defaultValue={phoneNumber}
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
                                    defaultValue={relationship}
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
                                    defaultValue={dateOfBirthData}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                                <h2>First Contact Timestamp</h2>
                                <input
                                    type="text"
                                    id="firstContactTimestamp"
                                    name="lastMetData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2091"
                                    defaultValue={lastMetData}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />
                                <h2>Assigned Group</h2>
                                <select
                                    id="assignedGroup"
                                    name="groupId"
                                    value={groupId}
                                    placeholder={groupName}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                >
                                    <option value="">None</option>
                                    {groupsList.map((group, i) => (
                                        <option key={i} value={group._id}>
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
                                    defaultValue={additionalNotes}
                                    onChange={this.handleChange}
                                    className="display-content grey"
                                />

                                <h2>Photo</h2>
                                <p>
                                    Click on the "Choose File" button to choose
                                    a picture:
                                </p>
                                {photo !== undefined ? (
                                    <div>
                                        <p>
                                            <small>
                                                (This action will override the
                                                previous picture)
                                            </small>
                                        </p>
                                        <button
                                            className="base-button"
                                            type="button"
                                            onClick={this.removeImage}
                                        >
                                            Remove Image
                                        </button>
                                        <div className="display-content white">
                                            <img
                                                alt="uploaded"
                                                src={`data:image/jpeg;base64,${photo}`}
                                            />
                                        </div>
                                    </div>
                                ) : null}

                                <input
                                    type="file"
                                    name="image"
                                    id="file"
                                    accept=".jpeg"
                                    onChange={(e) => this.onChange(e)}
                                    key={removePic}
                                />
                                <br />
                                <br />

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
export default contactAmend;

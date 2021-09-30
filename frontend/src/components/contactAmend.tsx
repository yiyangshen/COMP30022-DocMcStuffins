/* Import the required libraries and types */
import React from "react";
import "../css/newContact.css";
import history from "../history";

/* Import the required libraries and types */
import { getContactDetails, amendContactDetails} from "../api/contactApi";
import { getId } from "../api/userApi";
import { IContact } from "../interfaces";

/* Component to contact details */
class contactAmend extends React.Component {
    state = {
        error: null,
        isLoaded: false,
        contact: {} as IContact,
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
                    contact: data,
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
        const {contact} = this.state;
        event.preventDefault();

        /* Create memo. Then push new entry to history */
        amendContactDetails(contact);
    };


    render() {
        const { error, isLoaded, contact } = this.state;

        if (error === true) {
            return <h3 className="error">No Contact Present</h3>;
        } else if (isLoaded === false) {
            return <h3 className="error">Loading...</h3>;
        } else {
            return (
                <div className="border">
                    <h1>Add contact</h1>
                    <div className="box">
                        <form onSubmit={this.handleSave}>
                            <div className="boxLeft">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="firstName"
                                    value={contact.name.first}
                                    placeholder="Eg. John "
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="text"
                                    id="fullName"
                                    name="lastName"
                                    value={contact.name.last}
                                    placeholder="Eg. Doe"
                                    onChange={this.handleChange}
                                />
                                <label>Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    onChange={this.handleChange}
                                    value={contact.gender}
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
                                    value={contact.email}
                                    onChange={this.handleChange}
                                />
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    placeholder="Eg. 0412563286"
                                    value={contact.phoneNumber}
                                    onChange={this.handleChange}
                                />
                                <label>Relationship</label>
                                <input
                                    type="text"
                                    id="relationship"
                                    name="relationship"
                                    value={contact.relationship}
                                    placeholder="Eg. Friends"
                                    onChange={this.handleChange}
                                />
                                <label>First Contact Timestamp</label>
                                <input
                                    type="text"
                                    id="firstContactTimestamp"
                                    name="lastMetData"
                                    placeholder="Eg. 3.15pm, 13 Aug 2091"
                                    value={contact.lastMet?.toDateString()}
                                    onChange={this.handleChange}
                                />
                                <label>Assigned Group</label>
                                <select
                                    id="assignedGroup"
                                    name="groupId"
                                    value={contact.groupId}
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
                                    value={contact.additionalNotes}
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

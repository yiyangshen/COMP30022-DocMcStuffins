// /* Import the required libraries and types */
// import React from "react";
// import { Link } from "react-router-dom";
// import history from "../history";
// import "../css/newGroup.css";

// /* Import the required libraries and types */
// import { amendGroupDetails, getGroupDetails } from "../api/groupApi";
// import { IContact } from "../interfaces";
// import { getId } from "../api/userApi";
// import { getContactDetails } from "../api/contactApi";

// class newGroup extends React.Component {
//     state = {
//         isLoaded: false,
//         name: "",
//         members: "" as any,
//         contactsList: [] as IContact[],
//     };

//     /* Set state accordingly to the target */
//     handleChange = (event: { target: { name: any; value: String } }) => {
//         this.setState({ [event.target.name]: event.target.value });
//     };

//     groupId = getId() || "";

//     /* During loading page */
//     async componentDidMount() {
// getGroupDetails(this.groupId).then(
//     (response) => {
//         var data = response.data.data;
//         console.log(data);
//         this.setState({
//             isLoaded: true,
//             contactsList: data.members, //in terms of Icontacts[]
//             name: data.name,
//         });
//     },
//     (error) => {
//         this.setState({ isLoaded: true, error });
//         console.log(error);
//     }
// );
//         /* Retrieve item in local storage and parse them */
//         const value = localStorage.getItem("chosen");
//         if (value) {
//             this.setState({ members: JSON.parse(value) });
//         }
//         const label = localStorage.getItem("name");
//         if (label) {
//             this.setState({ name: JSON.parse(label) });
//         }

//         const { members } = this.state;
//         /* Loop through all contact ids and get their details, set the state */
//         for (var i = 0; i < members.length; i++) {
//             getContactDetails(members[i]).then(
//                 (response) => {
//                     var data = response.data.data;
//                     this.setState({
//                         contactsList: [this.state.contactsList, data],
//                     });
//                     console.log(response);
//                 },
//                 (error) => {
//                     console.log(error);
//                 }
//             );
//         }
//     }
//     /* Remember state for the next mount */
//     componentWillUnmount() {
//         localStorage.setItem("name", JSON.stringify(this.state.name));
//     }

//     /* Handle when click on submit button */
//     handleSubmit = (event: { preventDefault: () => void }) => {
//         const { name, members,} = this.state;
//         event.preventDefault();
//         localStorage.removeItem("name");
//         localStorage.removeItem("chosen");
//         amendGroupDetails(this.groupId, name, members);
//     };

//     /* Handle when click on cancel button */
//     handleCancel = (event: { preventDefault: () => void }) => {
//         localStorage.removeItem("name");
//         localStorage.removeItem("chosen");
//         history.push("/groups");
//     };

//     render() {
//         const { name, contactsList, members } = this.state;

//         return (
//             <div className="border">
//                 <h1>Edit Group</h1>
//                 <div className="AGbox">
//                     <label>Name</label>
//                     <input
//                         type="name"
//                         id="groupName"
//                         name="name"
//                         placeholder="Eg. Unimelb"
//                         value={name}
//                         onChange={this.handleChange}
//                     />
//                     <div className="box1">
//                         <label>Members</label>
//                         <div className="box, white">
//                             <h2>{members.length + contactsList.length}</h2>
//                         </div>
//                         <Link to="/groups/new/contact" className="addContact">
//                             add contact
//                         </Link>
//                     </div>
//                 </div>

//                 <table>
//                     <thead>
//                         <tr className="table-lable">
//                             <th>Name</th>
//                             <th>Phone</th>
//                             <th>Email</th>
//                         </tr>
//                     </thead>
//                     {contactsList !== undefined && contactsList.length > 0 ? (
//                         <div>
//                             {contactsList.map((contact, i) => (
//                                 <div key={i}>
//                                     {" "}
//                                     <tbody>
//                                         <tr className="table-contents">
//                                             <td>
//                                                 {contact.name.first}{" "}
//                                                 {contact.name.last}
//                                             </td>
//                                             <td>{contact.phoneNumber}</td>
//                                             <td>{contact.email}</td>
//                                         </tr>
//                                     </tbody>
//                                 </div>
//                             ))}{" "}
//                         </div>
//                     ) : (
//                         <tbody>
//                             <tr>
//                                 <td></td>
//                                 <td>No data yet</td>
//                                 <td></td>
//                             </tr>
//                         </tbody>
//                     )}
//                 </table>
//                 <button
//                     className="base-button"
//                     type="button"
//                     onClick={this.handleCancel}
//                 >
//                     <h2>Cancel</h2>
//                 </button>
//                 <button
//                     className="base-button"
//                     type="submit"
//                     onClick={this.handleSubmit}
//                 >
//                     <h2>Save</h2>
//                 </button>
//             </div>
//         );
//     }
// }

// export default newGroup;

/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import history from "../history";
import { IContact } from "../interfaces";

/* Import components */
import { amendGroupDetails, getGroupDetails } from "../api/groupApi";
import { getContactDetails } from "../api/contactApi";
import "../css/newGroup.css";
import { getId } from "../api/userApi";

/* Component for new cgroup */
class groupNew extends React.Component {
    /* Declare states */
    state = {
        name: "",
        members: "" as any,
        contactsList: [] as IContact[],
    };

    groupId = getId() || "";

    /* Set state accordingly to the target */
    handleChange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /* During loading page */
    async componentDidMount() {
        /* Retrieve item in local storage and parse them */
        const value = await localStorage.getItem("chosen");
        if (value) {
            this.setState({ members: JSON.parse(value) });
        }
        const label = await localStorage.getItem("name");
        if (label) {
            this.setState({ name: JSON.parse(label) });
        }

        const { members } = this.state;

        /* Loop through all contact ids and get their details, set the state */
        for (var i = 0; i < members.length; i++) {
            await getContactDetails(members[i]).then(
                (response) => {
                    var data = response.data.data;
                    this.setState({
                        contactsList: [...this.state.contactsList, data],
                    });
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
        }

        await getGroupDetails(this.groupId).then(
            (response) => {
                var data = response.data.data;
                console.log(data);
                console.log(this.state.name);
                console.log(this.state.contactsList);
                this.setState({
                    isLoaded: true,
                });

                if (this.state.name.trim() === "") {
                    this.setState({ name: data.name });

                    if (this.state.contactsList.length === 0) {
                        this.setState({ contactsList: data.members }); //in terms of Icontacts[]
                    }
                }
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }

    /* Remember state for the next mount */
    componentWillUnmount() {
        localStorage.setItem("name", JSON.stringify(this.state.name));
    }

    /* Handle when click on submit button */
    handleSubmit = (event: { preventDefault: () => void }) => {
        const { name, members } = this.state;
        event.preventDefault();

        /* Remove item from local storage and create group */
        localStorage.removeItem("name");
        localStorage.removeItem("chosen");
        amendGroupDetails(this.groupId, name, members);
    };

    /* Handle when click on cancel button */
    handleCancel = (event: { preventDefault: () => void }) => {
        /* Remove item from local storage and push to group page */
        localStorage.removeItem("name");
        localStorage.removeItem("chosen");
        history.push("/groups");
    };

    /* Render the component to the screen */
    render() {
        const { name, contactsList } = this.state;

        return (
            <div className="border">
                <h1>Edit Group</h1>
                <div className="AGbox">
                    <label>Name</label>
                    <input
                        type="name"
                        id="groupName"
                        name="name"
                        placeholder="Eg. Unimelb"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <div className="box1">
                        <label>Members</label>
                        <div className="box, white">
                            <h2>{contactsList.length}</h2>
                        </div>
                        <Link to="/groups/new/contact" className="addContact">
                            add contact
                        </Link>
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
                    {contactsList !== undefined && contactsList.length > 0 ? (
                        <div>
                            {contactsList.map((contact, i) => (
                                <div key={i}>
                                    {" "}
                                    <tbody>
                                        <tr className="table-contents">
                                            <td>
                                                {contact.name.first}{" "}
                                                {contact.name.last}
                                            </td>
                                            <td>{contact.phoneNumber}</td>
                                            <td>{contact.email}</td>
                                        </tr>
                                    </tbody>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <tbody>
                            <tr>
                                <td></td>
                                <td>No data yet</td>
                                <td></td>
                            </tr>
                        </tbody>
                    )}
                </table>
                <button
                    className="base-button"
                    type="button"
                    onClick={this.handleCancel}
                >
                    <h2>Cancel</h2>
                </button>
                <button
                    className="base-button"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    <h2>Submit</h2>
                </button>
            </div>
        );
    }
}

/* Export component */
export default groupNew;

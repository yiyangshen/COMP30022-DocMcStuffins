/* Import the required libraries and types */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

/* Import components */
import history from "./history";
import Nav from "./components/nav";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import ViewContacts from "./components/viewContacts";
import Dashboard from "./components/dashboard";
import NewContact from "./components/newContact";
import NewMemo from "./components/newMemo";
import NewGroup from "./components/newGroup";
import ViewGroups from "./components/viewGroups";
import ViewMemos from "./components/viewMemos";
import MemoDetails from "./components/memoDetails";
import ContactDetails from "./components/contactDetails";
import AddContact from "./components/addContact";
import GroupDetails from "./components/groupDetails";
import Profile from "./components/profile";
import MemoAmmend from "./components/memoAmmend";
import GroupAmmend from "./components/groupAmmend"
import ContactAmmend from "./components/contactAmmend"

/* Enable credentials to be shared among pages */
axios.defaults.withCredentials = true;

/* Change the Axios base URL based on the environment */
switch (process.env.NODE_ENV) {
    case "production":
        axios.defaults.baseURL = "https://snaccs-in-a-van.herokuapp.com";
        break;
    case "development":
    default:
        axios.defaults.baseURL = "http://localhost:48080/api";
        break;
}

/* Component to create routes */
function App() {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />

                    <div>
                        <Nav />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/user/profile" component={Profile} />

                        <Route
                            exact
                            path="/contacts"
                            component={ViewContacts}
                        />
                        <Route
                            exact
                            path="/contacts/new"
                            component={NewContact}
                        />
                        <Route
                            exact
                            path="/contacts/details"
                            component={ContactDetails}
                        />
                        <Route exact path="/contacts/details/ammend" component = {ContactAmmend}/>

                        <Route exact path="/groups" component={ViewGroups} />
                        <Route exact path="/groups/new" component={NewGroup} />
                        <Route
                            exact
                            path="/groups/new/contact"
                            component={AddContact}
                        />
                        <Route
                            exact
                            path="/groups/details"
                            component={GroupDetails}
                        />
                        <Route exact path="groups/details/ammend" component={GroupAmmend}/>

                        <Route exact path="/memos" component={ViewMemos} />
                        <Route exact path="/memos/new" component={NewMemo} />
                        <Route
                            exact
                            path="/memos/details"
                            component={MemoDetails}
                        />
                        <Route
                            exact
                            path="/memos/details/ammend"
                            component={MemoAmmend}
                        />
                    </div>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

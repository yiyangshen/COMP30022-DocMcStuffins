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
import newContact from "./components/newContact"
import newMemo from "./components/newMemo";
import newGroup from "./components/newGroup";
import ViewGroups from "./components/viewGroups";
import ViewMemos from "./components/viewMemos";

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
                        <Route exact path="/profile" />

                        <Route
                            exact
                            path="/contacts"
                            component={ViewContacts}
                        />
                        <Route exact path="/contacts/new" component={newContact} />
                        <Route path="/contacts/details" />

                        <Route exact path="/groups" component={ViewGroups} />
                        <Route exact path="/groups/new" component = {newGroup}/>
                        <Route path="/groups/details" />

                        <Route exact path="/memos" component={ViewMemos} />
                        <Route exact path="/memos/new" component = {newMemo} />
                        <Route path="/memos/details" />
                    </div>
                </Switch>
            </Router>
        </div>
    );
}

export default App;

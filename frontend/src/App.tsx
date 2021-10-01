/* Import the required libraries and types */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

/* Import components */
import history from "./history";
import Home from "./components/home";
import Nav from "./components/nav";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Profile from "./components/profile";
import Dashboard from "./components/dashboard";

import ContactView from "./components/contactView";
import ContactNew from "./components/contactNew";
import ContactDetails from "./components/contactDetails";
import ContactAmend from "./components/contactAmend";

import GroupDetails from "./components/groupDetails";
import GroupAmend from "./components/groupAmend";
import GroupAddContact from "./components/groupAddContact";
import GroupNew from "./components/groupNew";
import GroupView from "./components/groupView";

import MemoNew from "./components/memoNew";
import MemoView from "./components/memoView";
import MemoDetails from "./components/memoDetails";
import MemoAmend from "./components/memoAmend";

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
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/register" component={SignUp} />

                    <div>
                        <Nav />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/user/profile" component={Profile} />

                        <Route exact path="/contacts" component={ContactView} />
                        <Route
                            exact
                            path="/contacts/new"
                            component={ContactNew}
                        />
                        <Route
                            exact
                            path="/contacts/details"
                            component={ContactDetails}
                        />
                        <Route
                            exact
                            path="/contacts/details/amend"
                            component={ContactAmend}
                        />

                        <Route exact path="/groups" component={GroupView} />
                        <Route exact path="/groups/new" component={GroupNew} />
                        <Route
                            exact
                            path="/groups/new/contact"
                            component={GroupAddContact}
                        />
                        <Route
                            exact
                            path="/groups/details"
                            component={GroupDetails}
                        />
                        <Route
                            exact
                            path="/groups/details/amend"
                            component={GroupAmend}
                        />

                        <Route exact path="/memos" component={MemoView} />
                        <Route exact path="/memos/new" component={MemoNew} />
                        <Route
                            exact
                            path="/memos/details"
                            component={MemoDetails}
                        />
                        <Route
                            exact
                            path="/memos/details/amend"
                            component={MemoAmend}
                        />
                    </div>
                </Switch>
            </Router>
        </div>
    );
}

/* Export component */
export default App;

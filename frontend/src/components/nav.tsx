/* Import the required libraries and types */
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";

/* Import components */
import "../css/nav.css";
import Logo from "../img/logo.svg";
import Dashboard from "../img/dashboard.svg";
import Contacts from "../img/contacts.svg";
import Groups from "../img/groups.svg";
import Memos from "../img/memos.svg";
import Logout from "../img/logout.svg";

/* Navigation bar at the bottom of all customer page */
export default function Nav() {
    return (
        <nav className="sidenav">
            <img className="logo" src={Logo} alt="logo" />

            <NavLink className="contents" exact to="/dashboard">
                <h2>
                    <ReactSVG className="icon" src={Dashboard} />
                    Dashboard
                </h2>
            </NavLink>

            <NavLink className="contents" exact to="/contacts">
                <h2>
                    <ReactSVG class="icon" src={Contacts} />
                    Contacts
                </h2>
            </NavLink>

            <NavLink className="contents" exact to="/groups">
                <h2>
                    <ReactSVG class="icon" src={Groups} />
                    Groups
                </h2>
            </NavLink>

            <NavLink className="contents" exact to="/memos">
                <h2>
                    <ReactSVG class="icon" src={Memos} />
                    Memos
                </h2>
            </NavLink>

            <NavLink className="contents logout" exact to="/login">
                <h2>
                    <ReactSVG class="icon" src={Logout} />
                    Logout
                </h2>
            </NavLink>
        </nav>
    );
}

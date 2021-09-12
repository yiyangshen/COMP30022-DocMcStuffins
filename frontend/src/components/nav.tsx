/* Import the required libraries and types */
import React from "react";
import { NavLink } from "react-router-dom";

/* Import components */
import "../css/nav.css";

/* Navigation bar at the bottom of all customer page */
export default function Nav() {
    return (
        <nav className="sidenav">
            <NavLink className="sidenav a" exact to="/dashboard">
                <h2>Dashboard</h2>
            </NavLink>

            <NavLink exact to="/contacts">
                <h2>Contacts</h2>
            </NavLink>

            <NavLink exact to="/groups">
                <h2>Groups</h2>
            </NavLink>

            <NavLink exact to="/memos">
                <h2>Memos</h2>
            </NavLink>
        </nav>
    );
}

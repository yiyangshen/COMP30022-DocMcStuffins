/* Import the required libraries and types */
import React from 'react';
import { NavLink } from "react-router-dom";

/* Import components */

/* Navigation bar at the bottom of all customer page */
export default function Nav() {
    return (
        <nav>
            <NavLink exact to="/dashboard">

            </NavLink>

            <NavLink exact to="/contacts">
                
            </NavLink>

            <NavLink exact to="/groups">
                
            </NavLink>

            <NavLink exact to="/memos">
                
            </NavLink>
        </nav>
    )
};

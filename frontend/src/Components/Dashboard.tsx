/* Import the required libraries and types */
import React from "react";
import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Nav, Navbar, Form } from "react-bootstrap";

/* Import components */
import "../css/nav.css";
import history from "../history";
import Logo from "../img/logo.svg";
import Dashboard from "../img/dashboard.svg";
import Contacts from "../img/contacts.svg";
import Groups from "../img/groups.svg";
import Memos from "../img/memos.svg";
import Logout from "../img/logout.svg";
import BackArrow from "../img/back-arrow.svg";
import FrontArrow from "../img/front-arrow.svg";

export default function DashB() {
    return (
    <h1>Yi Yiyang!</h1>
    
    <div class = "Memos">
        <h1>Memos</h1>
        <div class="page">
            <img src="../src/img/Memo.png" alt="Memo img" class = 'MemoPng'/>
            <h2 class="MemoText">Groceries</h2>
        </div>
    </div>

    <div>
        <div class = "RecentGroups">
            <h1>Recent Groups</h1>
            <div class="RecentGroup">
                <span style="text-align: center;" class="dot">
                    <div class= "RecentGroupText">
                        <h2>Family</h2>
                        <h3>5</h3>
                    </div>
                </span>
            </div>
        </div>
    </div>

    <div class="Group">
        <img src="../src/img/3 User.png" alt="Group img", class = 'GroupPng', />
        <div style="text-align: center;" class="container", >
            <h1>Group</h1>
            <h2>6</h2>
        </div>
    </div>

    <div class="Contacts">
        <img src="../src/img/Profile.png" alt="Contacts img", class = 'ContactsPng'>
        <div style="text-align: center;" class="Contactscontainer", >
            <h1>Contacts</h1>
            <h2>6</h2>
        </div>
    </div>
    );
}
/* Import the required libraries and types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./sidebarData";

/* Import components */
import "../css/nav.css";
import { logoutUser } from "../api/userApi";

/* Function for navigation bar */
function Navi() {
    /* Set state */
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    /* Render the component to the screen */
    return (
        <>
            <div className="navbar">
                <Link to="#" className="menu-bars">
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                <Form className="form-center">
                    <h2>
                        <input type="text" placeholder="Search" className="" />
                    </h2>
                </Form>
                <Link to="/user/profile" className="menu-bars">
                    <h2>Profile</h2>
                </Link>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li className="navbar-toggle">
                        <Link to="#" onClick={logoutUser}>
                            <h2 className="menu-bars logout">
                                <AiIcons.AiFillCaretLeft />
                                <span>Logout</span>
                            </h2>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

/* Export function */
export default Navi;

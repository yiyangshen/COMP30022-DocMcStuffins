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

function Navi() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

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

export default Navi;

// /* Navigation bar at the bottom of all customer page */
// export default function Navi() {
//     return (
//         <div>
//             <nav className="sidenav">
//                 <img className="logo" src={Logo} alt="logo" />

//                 <NavLink className="contents" exact to="/dashboard">
//                     <h2>
//                         <ReactSVG className="icon" src={Dashboard} />
//                         Dashboard
//                     </h2>
//                 </NavLink>

//                 <NavLink className="contents" exact to="/contacts">
//                     <h2>
//                         <ReactSVG class="icon" src={Contacts} />
//                         Contacts
//                     </h2>
//                 </NavLink>

//                 <NavLink className="contents" exact to="/groups">
//                     <h2>
//                         <ReactSVG class="icon" src={Groups} />
//                         Groups
//                     </h2>
//                 </NavLink>

//                 <NavLink className="contents" exact to="/memos">
//                     <h2>
//                         <ReactSVG class="icon" src={Memos} />
//                         Memos
//                     </h2>
//                 </NavLink>

//                 <NavLink className="contents logout" exact to="/signin">
//                     <h2>
//                         <ReactSVG class="icon" src={Logout} />
//                         Logout
//                     </h2>
//                 </NavLink>
//             </nav>

//             <Navbar expand="lg" className="d-flex flex-row-reverse p-2 header">
//                 <Nav>
//                     <Nav.Item>
//                         <Nav.Link href="/profile">
//                             <h2>Profile</h2>
//                         </Nav.Link>
//                     </Nav.Item>
//                 </Nav>
//                 <Form className="form-center">
//                     <h2>
//                         <input type="text" placeholder="Search" className="" />
//                     </h2>
//                 </Form>
//                 <input
//                     type="image"
//                     alt="front"
//                     className="front"
//                     src={FrontArrow}
//                     onClick={() => history.goForward()}
//                 />
//                 <input
//                     type="image"
//                     alt="back"
//                     className="back"
//                     src={BackArrow}
//                     onClick={() => history.goBack()}
//                 />
//             </Navbar>
//         </div>
//     );
// }

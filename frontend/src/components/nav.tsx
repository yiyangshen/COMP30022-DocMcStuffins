/* Import the required libraries and types */
import React from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./sidebarData";

/* Import components */
import "../css/nav.css";
import { logoutUser } from "../api/userApi";
import { getContacts } from "../api/contactApi";
import { IContact } from "../interfaces";




class Navi extends React.Component {
    /* Set state */
    state = {
        showSidebar: false,
        contactList: [] as IContact[],
        search:''
    };

    async componentDidMount() {
        /* Get all contacts and set states */
        await getContacts().then(
            (response) => {
                var data = response.data.data;
                this.setState({ contactList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );
    }
    

    handleClick = () => {
        console.log('this is:', this);
        this.setState(!this.state.showSidebar);
    }
    handlechange = (event: { target: { name: any; value: String } }) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const{
            showSidebar,
            contactList
        } = this.state;
        return( 
            <div>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={this.handleClick} />
                    </Link>
                    <Form className="form-center">
                        <h2>
                            <input type="text" placeholder="Search" className="Search"/>
                        </h2>
                    </Form>
                    <Link to="/user/profile" className="menu-bars">
                        <h2>Profile</h2>
                    </Link>
                </div>

                <nav className={showSidebar ? "nav-menu active" : "nav-menu"}>
                    <ul className="nav-menu-items" onClick={this.handleClick}>
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
            </div>
        )
        
    }
}
export default Navi;




// /* Function for navigation bar */
// function Navi() {
//     /* Set state */
//     const [sidebar, setSidebar] = useState(false);
//     const showSidebar = () => setSidebar(!sidebar);
//     const [searchTerm, setSearchTerm] = useState('');
//     const data[] = getContacts();
//     /* Render the component to the screen */
//     return (
//         <>
//             <div className="navbar">
//                 <Link to="#" className="menu-bars">
//                     <FaIcons.FaBars onClick={showSidebar} />
//                 </Link>
//                 <Form className="form-center">
//                     <h2>
//                         <input type="text" placeholder="Search" className="Search" onChange = {event => {setSearchTerm(event.target.value)}}/>
//                         {data.map }
//                     </h2>
//                 </Form>
//                 <Link to="/user/profile" className="menu-bars">
//                     <h2>Profile</h2>
//                 </Link>
//             </div>

//             <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//                 <ul className="nav-menu-items" onClick={showSidebar}>
//                     <li className="navbar-toggle">
//                         <Link to="#" className="menu-bars">
//                             <AiIcons.AiOutlineClose />
//                         </Link>
//                     </li>
//                     {SidebarData.map((item, index) => {
//                         return (
//                             <li key={index} className={item.cName}>
//                                 <Link to={item.path}>
//                                     {item.icon}
//                                     <span>{item.title}</span>
//                                 </Link>
//                             </li>
//                         );
//                     })}
//                     <li className="navbar-toggle">
//                         <Link to="#" onClick={logoutUser}>
//                             <h2 className="menu-bars logout">
//                                 <AiIcons.AiFillCaretLeft />
//                                 <span>Logout</span>
//                             </h2>
//                         </Link>
//                     </li>
//                 </ul>
//             </nav>
//         </>
//     );
// }

// /* Export function */
// export default Navi;

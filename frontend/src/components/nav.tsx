/* Import the required libraries and types */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./sidebarData";

/* Import components */
import "../css/nav.css";
import { logoutUser } from "../api/userApi";
import { getContacts } from "../api/contactApi";
import { IContact, IGroup } from "../interfaces";
import { getGroups } from "../api/groupApi";


class Navi extends React.Component {
    /* Set state */
    state = {
        showSidebar: false,
        contactList: [] as IContact[],
        groupsList: [] as IGroup[],
        names:['$'],
        search:'',
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
        /* Get all groups and set states */
        await getGroups().then(
            (response) => {
                var data = response.data.data;
                this.setState({ groupsList: data, isLoaded: true });
            },
            (error) => {
                this.setState({ isLoaded: true, error });
                console.log(error);
            }
        );

        //make list of group + contact names
        for (let i of this.state.contactList) {
            this.setState({
                names: [...this.state.names, i.name.first + " " + i.name.last],
            });
        }
        console.log("names = " + this.state.names);

    }
    

    handleClick = () => {
        this.setState({showSidebar: !this.state.showSidebar} );
    }
    handlechange = (event: { target: { value: any; }; }) => {
        this.setState({ search : event.target.value});
        console.log("search = " + this.state.search);
    };
    dynamicSearch = () => {
        if(this.state.search !== ""){
            const filtered = this.state.names.filter(name => name.toLowerCase().includes(this.state.search.toLowerCase()));
            console.log("filtered = " + filtered);
            return  filtered;
        }
    }

    render() {
        const{
            showSidebar,
            search,
        } = this.state;
        return( 
            <div>
                <div className="navbar">
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={this.handleClick} />
                    </Link>
                    <Form className="form-center">
                            <input type="text" placeholder="Search" className="Search" onChange = {this.handlechange}/>
                            {this.dynamicSearch()}
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
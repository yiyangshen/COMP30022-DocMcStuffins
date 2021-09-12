/* Import the required libraries and types */
import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import './App.css';

/* Import components */
import history from "./history";
// import Nav from "./components/nav";

/* Component to create routes */
function App() {
  return (
    <div>
      <Router history = {history}>
        <Switch>
          <Route exact path="/login" />
          <Route exact path="/signup" />

          <div>
            {/* <Nav /> */}
            <Route exact path="/dashboard" />

            <Route exact path="/contacts" />
            <Route exact path="/contacts/add" />

            <Route exact path="/groups" />
            <Route exact path="/groups/add" />

            <Route exact path="/memo" />
            <Route exact path="/memo/add" />
          </div>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;

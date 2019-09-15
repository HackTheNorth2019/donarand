import React, { Component } from 'react';
//import './App.css';
import Home from './Home.jsx'
import Searchhistory from './Searchhistory.jsx'
import Searchdonors from './Searchdonors.jsx';
import Login from './Login.jsx';
import Donate from './Donate.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAGuNHq0Pwt5S0dkhlCULDFTYbWNSszRQ&callback=initMap"
        type="text/javascript"></script>

        <Router>
     
            <Route exact path="/" component={Login}/>
            <Route path="/home" component={Home} />
            <Route path="/searchhistory" component={Searchhistory} />
            <Route path="/searchdonors" component={Searchdonors} />
            <Route path="/donate" component={Donate} />

        </Router>
      </div>
    );
  }
}
export default App;

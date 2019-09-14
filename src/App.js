import React, { Component } from 'react';
//import './App.css';
import Home from './Home.jsx'
import Transactions from './Transactions.jsx'
import Searchdonors from './Searchdonors.jsx';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>

        <Router>
     
            <Route exact path="/" component={Home} />
            <Route path="/records" component={Transactions} />
            <Route path="/searchdonors" component={Searchdonors} />
            {/*<Route path="/records" component={Transactions} />*/}

        </Router>
      </div>
    );
  }
}
export default App;

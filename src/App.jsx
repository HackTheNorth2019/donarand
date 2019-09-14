import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import Home from './Home.jsx'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
      </div>
    </Router>
    );
  }
}

export default App;

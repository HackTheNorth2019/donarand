import React, { Component } from 'react';
//import './App.css';
import Home from './Home.jsx'
import Searchhistory from './Searchhistory.jsx'
import Searchdonors from './Searchdonors.jsx';
import Login from './Login.jsx';
import Donate from './Donate.jsx';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { 
  CSSTransition, 
  TransitionGroup 
} from 'react-transition-group';
import Particles from 'react-particles-js'
import TopNavbar from './Navbar.jsx'

import './styles.css';
var regex = /\b(?!home)\b\S+/i;

const supportsHistory = 'pushState' in window.history;

class App extends Component {
   
  render() {
    return (
      <div>
      
        <Router forceRefresh={!supportsHistory}>            
            <div>
              <Route exact path="/" component={Login}/>
              <Route path={regex} component={TopNavbar} />
              <main>
                <Route
                  render={({ location }) => {
                    const { pathname } = location;
                    return (
                      <div>

                      <TransitionGroup>
                        <CSSTransition 
                          key={pathname}
                          classNames="page"
                          timeout={{
                            enter: 1000,
                            exit: 1000,
                          }}
                        >

                          <Route
                            location={location}
                            render={() => (
                          
                              
                              <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/searchhistory" component={Searchhistory} />
                                <Route path="/searchdonors" component={Searchdonors} />
                                <Route path="/donate" component={Donate} />
                              </Switch>
                              
                            )}
                          />
                        </CSSTransition>
                      </TransitionGroup>
                      </div>
                    );
                  }}
                />
              </main>
            </div>
      
            </Router>
        
      </div>
    );
  }
}
export default App;

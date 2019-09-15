import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';


import * as Data from './data.js';


export default class TopNavbar extends Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    genOptions() {
        var ret = [];
        for(var i = 0; i < Data.navbar_items.length; i++){
          ret.push(<span><Link to={Data.navbar_items[i][1]} key={"key" + Data.navbar_items[i][0]} > {Data.navbar_items[i][0]} </Link> 
            <span>&nbsp; &nbsp;</span></span> )
        }
        return ret;
    }

    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <img src={require('./heart-small.png')} />
            <NavbarBrand href="/home">{Data.NAME}</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.genOptions()}
                {/*<UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Option 1
                    </DropdownItem>
                    <DropdownItem>
                      Option 2
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                      Reset
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>*/}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
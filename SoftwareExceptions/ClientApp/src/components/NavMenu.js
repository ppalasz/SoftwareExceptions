import React, { Component } from "react";
import { UserName } from "../components/UserName.js"
import "bootstrap/dist/js/bootstrap.js";
import "./NavMenu.css";

export class NavMenu extends Component {
  
  constructor (props) {
	super(props);

	this.toggleNavbar = this.toggleNavbar.bind(this);
	this.state = {
	  collapsed: true
	};
  }

  toggleNavbar () {
	this.setState({
	  collapsed: !this.state.collapsed
	});
  }

  render () {
	return (
	 
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
      <UserName/>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          
          <li className="nav-item">
            <a className="nav-link" href="/software-exceptions">Software Exceptions</a>
          </li>         
            
          <li className="nav-item dropdown">
            <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dictionaries
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">              
              <a className="dropdown-item" href="/Software-versions">Software/Versions</a>
              <a className="dropdown-item" href="/Customers">Customers</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    );
  }
}

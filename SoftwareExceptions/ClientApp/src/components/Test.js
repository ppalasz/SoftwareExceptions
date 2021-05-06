import React, {Component} from "react";

import "bootstrap/dist/css/bootstrap.css";

import {DropdownChosen} from "../components/DropdownChosen.js"


export class Test extends Component {

  handleChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    console.log(`${name}='${value}'`)
  };

  render(){
    return <DropdownChosen 
    value="2"
    isSearchable={true}
    url= {process.env.PUBLIC_URL + `api/Customer/dropdown`}
    name="CustomerId" 
    id="SoftwareVersionId" 
    placeholder="Software and Version..."
    onChange={this.handleChange} />


  }
}
 
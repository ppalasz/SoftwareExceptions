import React, { Component } from "react";
import Select from 'react-select';
import {Alert} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner"
import "bootstrap/dist/css/bootstrap.css";

export class DropdownChosen extends Component {
  _isMounted = false;   
  
  
  constructor(props) {
    super(props);

    this.name = props.name;
    this.id = props.id;
    this.url = props.url;
    this.method = props.method ?? "GET";
    this.onChange = props.onChange;
    this.isSearchable = props.isSearchable ?? false;
    this.placeholder = props.placeholder ?? ""
    this.isRequired = props.required ?? false;
    this.className = `select-wrapper ${props.className}` ;

    this.state = {
      fetchedData: [],
      value: this.props.value,       
      error: "",
      isDisabled: this.props.isDisabled ?? false,
      isLoaded: false,
      isLoading: false,      
    }

    this.LoadData = this.LoadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
      if (this._isMounted) {
        this.setState({ isLoaded: false, isLoading:true });
      }

      this.LoadData();
  }   

  LoadData=()=>{
    let headers = new Headers();
    headers.append("Content-Type", "application/json"); 

    fetch(this.url,{
      credentials: "include" , 
      method: this.method, 
      //cache: 'no-cache',
      mode:"cors",   
      redirect: "follow",    
      headers: headers 
    })
      .then(response => response.json())
      .then(data => this.setState({ fetchedData: data, isLoaded: true, isLoading:false }))
      .catch(error => this.setState({ error, isLoaded: false, isLoading:false }));
  }

  render() {    
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    let html =""    
    if (!this.state.isLoaded) {
      html = <p><Spinner as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true" /> Loading {this.state.name}...</p>;
    }
    else
    {
      //console.log(this.state.fetchedData);     

      if(this.state.fetchedData.success)
      {
        var data = this.state.fetchedData.data;

        return (
          html = this.renderSelect(data)
        );
      }
      else
      {       
        let error = this.state.fetchedData.message ?? this.state.error ?? "no data"

        html = <Alert show={true}
          variant="danger" >{error}</Alert>
      }
    }
    return html
  }  

  handleChange = (selectedOption) => { 
      
    let value = selectedOption.value

    //console.log(`selectedOption.value= ${value}`)

    this.setState({"value":value});

    let name = this.name

    //console.log(`${name}=${value}`);
    
    let e = { 
      target: {   
        name: name,
        id: this.id,
        value: value
      }
    };
   
    this.onChange(e);
    this.setState({ selectedOption: value });
    
  }

  componentDidUpdate(prevProps) {
    if(this.props.isDisabled !== prevProps.isDisabled) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({"isDisabled": this.props.isDisabled});
    }
  } 
  
  renderSelect(fetchedData) {   

    const isDisabled = this.state.isDisabled

    let error = this.state.error ?? "";
    
    let errorHtml = error ==="" ? "" : <Alert variant="danger" dismissible 
    show={(error!=="")}
    onClose={() => this.setState({"error": ""})} >{error}</Alert>

    let options = [];

    fetchedData.forEach(item => {
      options.push({
        value: item.value,
        label: item.label
      });
    });    
    
    let value = this.state.value;
    
    let selectedOption = options.find(function(item) {
      return item.value === value;
    });
   
    //https://www.npmjs.com/package/react-select
   
    return (
      <div className="select-wrapper-container">
      {errorHtml}       
      <Select
        className = {this.className}
        id = {this.id}
        name = {this.name}
        defaultValue={selectedOption}     
        onChange= {this.handleChange}
        options= {options}
        isSearchable={this.isSearchable}
        placeholder={this.placeholder}
        isDisabled={isDisabled}
        required={this.isRequired}
      />
      <input 
        className="input-required" 
        type="text" 
        defaultValue={selectedOption} 
        tabIndex={-1}
        autoComplete="off" 
        required={this.isRequired}
        disabled={isDisabled} 
      />
      </div>    
    );
  }
}

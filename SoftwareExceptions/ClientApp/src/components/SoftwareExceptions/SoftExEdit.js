import React, { Component } from "react";
import { Button, Alert, Modal } from "react-bootstrap";
import { DropdownChosen } from "../DropdownChosen.js";
import { CvssRating } from "../CvssRating.js";
import Spinner from "react-bootstrap/Spinner";
import { DateInput } from "../DateInput.js"

import "bootstrap/dist/css/bootstrap.css";

import "bootstrap-icons/font/bootstrap-icons.css";

require("dotenv").config();

export class SoftExEdit extends Component {
  _isMounted = false;   

  constructor(props) {
    super(props);
       
    this.state = { 
        fetchedData: [], 
        error: "",
        message:"",
        isLoaded : false,
        isLoading: false,    
        id: this.props.id ?? -1,
        show: this.props.show ?? false,  
        close: false, 
        saved:false,
        saving: false,
        changed:false,
        formData:{         
        }
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.LoadData = this.LoadData.bind(this);
    this.handleCloseError = ()=>{
      this.props.handleClose(false);
    }
    this.onSave = this.props.onSave;
  }

  handleEditClose = () => {   
      this.props.handleClose(this.state.changed);
    };

  handleChange = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    //console.log(`${name}='${value}'`)

    this.setState({"error": ""});
    this.setState({"message": ""});

    let formData = this.state.formData;
    formData[name] = value;

    this.setState({"formData": formData});
    this.setState({"changed": true});
    this.setState({"saved": false});

    
  }

  handleSubmit = (e) => {
    e.preventDefault();   
    this.setState({"saving": true});
    let id = this.state.id ?? 0;

    let url_post = process.env.PUBLIC_URL + `api/SoftwareExceptions`
    let method = "PUT"
    if(id===0) {
      method = "POST"
    }
    else{
      url_post = `${url_post}?id=${id}`;    
    }

    fetch(url_post, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: "include" , 
        method: method,
        mode:"cors",   
        redirect: "follow",  
        
        body: JSON.stringify(this.state.formData)
      })
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        if(data.success===true)
        {          
          this.setState({"message": data.message});
          this.setState({"changed": false});
          this.setState({"saved": true});
          this.setState({"saving": false});

          if(id===0) {
            this.setState({"id": data.newId});
            this.LoadData(data.newId);
          }
          else
            this.LoadData(id);

          this.onSave();
        }
        else
        {
          this.setState({"error": data.message, saving:false});
        }
      })          
      .catch(error => this.setState({ error, isLoaded: false, isLoading:false, saving:false }))
      .finally(()=> {
        window.scrollTo(0, 0)
        setTimeout(()=>{
          const topElement = document.getElementById('formSoftwareExceptions');
          topElement?.scrollIntoView({ behavior: 'smooth' })
        },500)
        
      });

    return false;
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    
    let id = this.state.id;
    
    if (this._isMounted) {
      this.setState({ isLoaded: false, isLoading:true });
    }
    
    if(id <= 0)
    {     
      this.setState({ "error": "", isLoaded: true, isLoading:false });
      return;
    }
    else
    {
      this.LoadData(id);
    }
  }   

  LoadData(id)
  {
    let form_data_url = process.env.PUBLIC_URL + `api/SoftwareExceptions/Get?id=${id}`;

      let headers = new Headers();
      headers.append("Content-Type", "application/json"); 

      fetch(form_data_url ,{
        credentials: "include" , 
        method: "GET", 
        mode:"cors",   
        redirect: "follow",    
        headers: headers 
      })
        .then(response => response.json())
        .then(data => {
          if(data.success === false)
          {
            this.setState({"error": data.message, isLoaded: true, isLoading:false })
            return
          }

          this.setState({ fetchedData: data, isLoaded: true, isLoading:false });
          var item = this.state.fetchedData.data;
          let formData = this.state.formData;
          for (var key in item) {
            if (item.hasOwnProperty(key)) {
                formData[key] = item[key];
            }
          }
          this.setState({"formData": formData}); 
          
        })          
        .catch(error => this.setState({"error": error, isLoaded: true, isLoading:false }));
  
  }


  render() {  
    let id = this.state.id;
    let show = this.state.show
    let error = this.state.error

    let html = ""
    let footer = ""
    let titleBase= "Software Exception"
    let title = titleBase
   
    if(id===0) //add
    {
      title = `Add New ${titleBase}`
      html = this.renderSoftwareExceptionsForm(null)
    }

    if (!this.state.isLoaded && id>0) {
      html = <p><Spinner as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true" /> Loading Software Exception...</p>
    }
    else {   

      if(id>0)  
      {
        if(this.state.fetchedData.success) { //edit
          title= `Edit ${titleBase}`
          var data = this.state.fetchedData.data;
            html = this.renderSoftwareExceptionsForm(data)        
        }
        else {           
          if(error!=="")
          {
            html = <Alert show={true} variant="danger" >{error}</Alert>
            footer = <Button className="float-right" variant="secondary" type="close" 
              onClick={this.handleCloseError}>Close</Button>
          }
        }
      }
    }    

    return <Modal show={show} className="modal-dialog-big" onHide={()=>{}}>
      <Modal.Body>
        <Modal.Header><b>{title}</b></Modal.Header>
        {html}
        <Modal.Footer>
          {footer}            
        </Modal.Footer>
      </Modal.Body>
    </Modal>
    
  }  
  

  renderSoftwareExceptionsForm(item) {       
      
    let error = this.state.error ?? ""
    let message = this.state.message ?? "";

    let infoHtml = message ==="" ? "" : <Alert  variant="success" dismissible 
    show={(message!=="")}
    onClose={() => this.setState({"message": ""})} >{message}</Alert>

    let errorHtml = error ==="" ? "" : <Alert variant="danger" dismissible 
    show={(error!=="")}
    onClose={() => this.setState({"error": ""})} >{error}</Alert>

    let spinner =""
    let saveText = "Save";
    if(this.state.saving)
    {
      spinner = <Spinner as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true" />
      saveText = "Wait...";
    }


    function padDigits(number, digits) {
      return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    const FormatDate = (dateText="") => {

        if(dateText==="" || dateText===null)
        {
          return "";
        }

        let date = new Date(dateText)

        return `${date?.getFullYear()}-${padDigits(date?.getMonth(),2)}-${padDigits(date?.getDay(),2)} ${padDigits(date?.getHours(),2)}:${padDigits(date?.getMinutes(),2)}`
    }

    //https://react-bootstrap.github.io/components/alerts/
    return (
      <form onSubmit={this.handleSubmit} id="formSoftwareExceptions">

        {infoHtml}
        {errorHtml}  
       
        <table className="table table-striped" aria-labelledby="tabelLabel"> 
          <tbody> 
              <tr>
                <td width="30%">ID</td>
                <td>{item?.softwareExceptionId ?? 0}
                
                  <input type="hidden" readOnly
                  defaultValue={item?.softwareExceptionId || 0}                   
                  name="SoftwareExceptionId" id="SoftwareExceptionId"  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="ExceptionName">Exception Name</label><span className="required">*</span></td>
                <td>
                  <input required type="text" maxLength="150" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Exception Name..." onChange={this.handleChange}                    
                  defaultValue={item?.exceptionName || ""}         
                  name="ExceptionName" id="ExceptionName"  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="CustomerId">Customer</label><span className="required">*</span></td>
                <td>

                <DropdownChosen 
                  className="form-control"
                  isSearchable={true}
                  isDisabled={this.state.saving}
                  value={item?.customerId}
                  url={process.env.PUBLIC_URL + `api/Customer/dropdown`}
                  name="CustomerId" 
                  id="CustomerId" 
                  placeholder="Customer..."
                  required={true}
                  onChange={this.handleChange} />

                </td>
              </tr>
              <tr>
                <td><label htmlFor="SoftwareVersionId">Product and Version</label><span className="required">*</span></td>
                <td>
                
                  <DropdownChosen 
                  className="form-control"
                  isSearchable={true}
                  value={item?.softwareVersionId}
                  isDisabled={this.state.saving}
                  url={process.env.PUBLIC_URL + `api/SoftwareVersion/dropdown`}
                  name="SoftwareVersionId" 
                  id="SoftwareVersionId" 
                  placeholder="Software and Version..."
                  required={true}
                  onChange={this.handleChange} />
                
                </td>                
              </tr>
              <tr>
                <td><label htmlFor="CvssScore">CVSS Score</label><span className="required">*</span></td>
                <td>
                
                  <input required type="number" step="0.1" min="0" max="10"
                  length = "30" className="form-control d-inline" 
                  disabled={this.state.saving}
                  placeholder="Cvss Score..." onChange={this.handleChange}                    
                  defaultValue={item?.cvssScore || ""}         
                  name="CvssScore" id="CvssScore"  />

                  <CvssRating value={this.state.formData["CvssScore"] || item?.cvssScore} />
                
                </td>                
              </tr>
              <tr>
                <td>Initiation Date</td>
                <td>
                  <DateInput 
                  value={Date.parse(`${(this.state.formData["InitiationDate"] || item?.initiationDate)}`?.substring(0,10)) }
                  name="InitiationDate"
                  placeholder="Initiation Date..."
                  onChange={this.handleChange}
                  disabled={this.state.saving}
                  />
                 
                </td>                
              </tr>
              <tr>
                <td>Expiration Date</td>
                <td>
                <DateInput 
                  value={Date.parse(`${(this.state.formData["ExpirationDate"] || item?.expirationDate)}`?.substring(0,10)) }
                  name="ExpirationDate"
                  placeholder="Expiration Date..."
                  onChange={this.handleChange}
                  disabled={this.state.saving}
                  />
                
                </td>                
              </tr>
              <tr>
                <td>Release Date</td>
                <td>
                <DateInput 
                  value={Date.parse(`${(this.state.formData["ReleaseDate"] || item?.releaseDate)}`?.substring(0,10)) }
                  name="ReleaseDate"
                  placeholder="Release Date..."
                  onChange={this.handleChange}
                  disabled={this.state.saving}
                  />
                
                </td>                
              </tr>
              <tr>
                <td>Exception Date</td>
                <td>
                <DateInput 
                  value={Date.parse(`${(this.state.formData["ExceptionDate"] || item?.exceptionDate)}`?.substring(0,10)) }
                  name="ExceptionDate"
                  placeholder="Exception Date..."
                  onChange={this.handleChange}
                  disabled={this.state.saving}
                  />
                
                </td>                
              </tr>
              <tr>
                <td><label htmlFor="Initiator">Initiator</label><span className="required">*</span></td>
                <td>
                  <input required type="text" maxLength="150" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Initiator..." onChange={this.handleChange}                    
                  defaultValue={item?.initiator || ""}         
                  name="Initiator" id="Initiator"  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="ProductOwner">Product Owner</label><span className="required">*</span></td>
                <td>
                  <input required type="text" maxLength="150" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Product Owner..." onChange={this.handleChange}                    
                  defaultValue={item?.productOwner || ""}         
                  name="ProductOwner" id="ProductOwner"  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="Reason">Reason</label><span className="required">*</span></td>
                <td>
                  <textarea required type="text" maxLength="500" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Reason..." onChange={this.handleChange}                    
                  rows="2"  
                  defaultValue={item?.reason || ""}  
                  name="Reason" id="Reason"  ></textarea>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="BusinessRiskAssessment">Business Risk Assessment</label><span className="required">*</span></td>
                <td>
                  <input required type="text" maxLength="150" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Business Risk Assessment..." onChange={this.handleChange}                    
                  defaultValue={item?.businessRiskAssessment || ""}         
                  name="BusinessRiskAssessment" id="BusinessRiskAssessment"  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="Decision">Decision</label></td>
                <td>
                  <input type="text" maxLength="150" className="form-control" 
                  disabled={this.state.saving}
                  placeholder="Decision..." onChange={this.handleChange}                    
                  defaultValue={item?.decision || ""}         
                  name="Decision" id="Decision"  />
                </td>
              </tr>
              <tr>
                <td>Created</td>
                <td>
                {FormatDate(item?.createdOnDate)} {item?.createdBy}               
                </td>                
              </tr>             
              <tr>
                <td>Modified</td>
                <td>
                {FormatDate(item?.modifiedOnDate)} {item?.modifiedBy}                
                </td>                
              </tr>
              <tr>
                  <th colSpan="2" className="">
                      <Button type="submit" variant="primary" 
                      disabled={!this.state.changed || this.state.saving}>
                      {spinner} {saveText}
                      </Button>    


                      <Button type="button" className="float-right" variant="secondary"  
                        onClick={this.handleEditClose}>Close</Button>                
                  </th>
              </tr>
            </tbody>          
      </table>      
      
      </form>
    );
  }


  
}

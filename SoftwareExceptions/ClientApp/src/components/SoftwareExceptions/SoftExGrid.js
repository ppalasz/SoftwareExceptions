import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Alert,Row,Col,Button} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner"
import "bootstrap/dist/css/bootstrap.css";
import {Confirmation} from "../Confirmation";
import {SoftExEdit} from "../SoftwareExceptions/SoftExEdit.js"
import {GridPager} from "../GridPager.js"
import {GridTd} from "../GridTd.js"
import {GridTh} from "../GridTh.js"
import { CvssRating } from "../CvssRating.js"

require("dotenv").config();

export class SoftExGrid extends Component {
  _isMounted = false;
  data_url = process.env.PUBLIC_URL + "api/SoftwareExceptions";
  edit_url = process.env.PUBLIC_URL + `software-exception/edit`;
  pageSize = 10;

  constructor(props) {
    super(props);
    const query = new URLSearchParams(this.props.location.search);
    this.state = { 
        fetchedData: [], 
        error: "",
        pageNr:query.get('page') ?? 0,
        isLoaded : false,
        isLoading: false,
        search:"",    
        sortColumn:"softwareExceptionId",
        sortDir:"asc"
      };      
      this.LoadGrid = this.LoadGrid.bind(this);
      this.proceeDelete = this.proceedDelete.bind(this);
      this.proceedCloseNoSave = this.proceedCloseNoSave.bind(this);
      this.handleChangePage = this.handleChangePage.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.onSort = this.onSort.bind(this);
  }

  onSort = (sortColumn, sortDir) => {   
    console.log(`sort ${sortColumn} ${sortDir}`)
    this.setState({sortColumn:sortColumn})    
    this.setState({sortDir:sortDir})    
  }

  handleChangePage = (nr) => {   
    this.setState({pageNr:nr})    
  }

  handleSearch = (event) => {        
    this.setState({"search": event.target.value});  
    this.setState({pageNr:0})      
    this.LoadGrid();
  }

  proceedCloseNoSave = (decision) => {
    //console.log(`decision=${decision}`)
    this.setState({"confirmCloseMsg": ""})
    if(decision)
      this.setState({"editId": -1})    
  }

  proceedDelete = (decision) => {
    //console.log(`decision=${decision}`)
    this.setState({"confirmDeleteMsg": ""})

    if(decision) {
      //console.log(`delete=${this.state.deleteID}`)
      let url_post=  process.env.PUBLIC_URL + `api/SoftwareExceptions?id=${this.state.deleteID}`;    

      fetch(url_post, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          credentials: "include" , 
          method: "DELETE",
          mode:"cors",   
          redirect: "follow"
        })
        .then(response => response.json())
        .then(data => {
          //console.log(data);
          if(data.success===true)
          {          
            this.setState({"message": data.message});          
            this.LoadGrid();
          }
          else
          {
            this.setState({"error": data.message});
          }
        })          
        .catch(error => this.setState({ error, isLoaded: false, isLoading:false }));     

      return false;

    }
  }

  LoadGrid=()=>{
    let headers = new Headers();
    headers.append("Content-Type", "application/json"); 
    
    fetch(this.data_url,{
      credentials: "include" , 
      method: "GET", 
      //cache: 'no-cache',
      mode:"cors",   
      redirect: "follow",    
      headers: headers 
    })
      .then(response => response.json())
      .then(data => this.setState({ fetchedData: data, isLoaded: true, isLoading:false }))
      .catch(error => this.setState({ error, isLoaded: false, isLoading:false }));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
      if (this._isMounted) {
        this.setState({ isLoaded: false, isLoading:true });
      }
      this.LoadGrid();
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
      aria-hidden="true" /> Loading Software Exceptions...</p>;
    }
    else
    {
      //console.log(this.state.fetchedData);     

      if(this.state.fetchedData.success)
      {
        var data = this.state.fetchedData.data;

        return (
          html = this.renderSoftwareExceptionsTable(data)
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

  renderSoftwareExceptionsTable(fetchedData) {   

    let handleAdd = () => {
      this.setState({"editId": 0});
    };   

    let handleDelete = (softwareExceptionId) => {
      this.setState({deleteID : softwareExceptionId})      
      this.setState({"confirmDeleteMsg": `Are you sure, you want to delete Software Exception id:${softwareExceptionId}`});
    };

    let handleEdit = (softwareExceptionId) => {     
      this.setState({"editId": softwareExceptionId});
    };
    
    let error = this.state.error ?? ""
    let message = this.state.message ?? "";
    let confirmCloseMsg = this.state.confirmCloseMsg ?? "";
    let confirmDeleteMsg = this.state.confirmDeleteMsg ?? "";
    let editId = this.state.editId ?? -1;    

    let infoHtml = message ==="" ? "" : <Alert  variant="success" dismissible 
    show={(message!=="")}
    onClose={() => this.setState({"message": ""})} >{message}</Alert>

    let errorHtml = error ==="" ? "" : <Alert variant="danger" dismissible 
    show={(error!=="")}
    onClose={() => this.setState({"error": ""})} >{error}</Alert>

    let confirmationCloseHtml = confirmCloseMsg ==="" ? "" : <Confirmation 
    backdrop={true}
    show={true} 
    confirmation={confirmCloseMsg}
    proceed= {this.proceedCloseNoSave}></Confirmation>

    let confirmationDeleteHtml = confirmDeleteMsg ==="" ? "" : <Confirmation 
    backdrop={true}
    show={true} 
    confirmation={confirmDeleteMsg}
    proceed= {this.proceedDelete}></Confirmation>

    let editHtml = (editId===-1) ? "" : <SoftExEdit id={editId} show={true} 
        onSave={()=>{
          //console.log("saved")
          this.LoadGrid();
        }}

        handleClose={(changed) => {
          if(changed)
          {            
            this.setState({"confirmCloseMsg": "Form is not saved. If you close it your changes will be lost"});
          }
          else
          {
            this.setState({"editId": -1}) 
          }

          return false;
        }
        }></SoftExEdit>

    let totalRowCount = fetchedData.length;

    if(this.state.search!=="")
    {
      //console.log(`search = '${this.state.search}'`)

      fetchedData = fetchedData.filter((item)=>{ 
        let result = false;     
        result = result || (`${item.exceptionName?.toLowerCase()}`.indexOf(this.state.search.toLowerCase()) !== -1);
        result = result || (`${item.customerName?.toLowerCase()}`.indexOf(this.state.search.toLowerCase()) !== -1);

        result = result || (`${item.softwareName?.toLowerCase()}`.indexOf(this.state.search.toLowerCase()) !== -1);
        result = result || (`${item.softwareVersion?.toLowerCase()}`.indexOf(this.state.search.toLowerCase()) !== -1);
        
        result = result || (`${item.softwareVendor?.toLowerCase()}`.indexOf(this.state.search.toLowerCase()) !== -1);
        result = result || (`${item.cvssScore}`.indexOf(this.state.search.toLowerCase()) !== -1);
        
          return result
      });
    }

    let dirDir = this.state.sortDir==="asc" ? 1 : -1;
    let sortColumn = this.state.sortColumn;

    fetchedData.sort(function(a, b){
      if(a[sortColumn] < b[sortColumn]) { return -dirDir }
      if(a[sortColumn] > b[sortColumn]) { return dirDir }
      return 0;
    });

    let rowCount = fetchedData.length;

    let showData = fetchedData.filter((i, index) =>{
        return (
          (index < (this.state.pageNr+1)*this.pageSize)
            &&
          (index >= (this.state.pageNr)*this.pageSize)
        )
    });
   

    return (
      <div className="main-div"> 
        {infoHtml}
        {errorHtml}        
        {confirmationCloseHtml}
        {confirmationDeleteHtml}
        {editHtml}        
        <Row><Col><h2>Software Exceptions</h2> </Col></Row>
        <Row className="mb-2">
          <Col></Col>
          <Col xs="3">  
            <div className="btn-group float-right">
              <input name="search" type="text" maxLength="150" className="form-control" 
                    size="100"
                    placeholder="Search..." 
                    id="searchinput" type="search"
                    onChange={this.handleSearch}                 
                    defaultValue={this.state.search || ""} />
                  <span id="searchclear" 
                  className="glyphicon glyphicon-remove-circle"></span>
            </div>          
          </Col>            
        </Row>

        <GridPager showStats={false}
        pageNr={this.state.pageNr} 
        pageSize={this.pageSize} 
        totalRowCount = {totalRowCount}
        rowCount={rowCount} 
        onChangePage={(nr) => this.handleChangePage(nr)} />

       
        <Row>
          <Col>
            <table className="table table-striped" aria-labelledby="tabelLabel">
              <thead>
                <tr className="grid-row">                 
                  <th>Id</th>
                  <GridTh width="25%" title="Name" column="exceptionName" onSort={this.onSort}  
                    currentSortColumn={this.state.sortColumn} currentSortDir={this.state.sortDir} />
                  <GridTh width="15%" title="Customer" column="customerName" onSort={this.onSort}  
                    currentSortColumn={this.state.sortColumn} currentSortDir={this.state.sortDir} />
                   <GridTh width="25%" title="Product/Version" column="softwareName" onSort={this.onSort}  
                    currentSortColumn={this.state.sortColumn} currentSortDir={this.state.sortDir} />
                  <GridTh width="20%" title="Vendor" column="softwareVendor" onSort={this.onSort}  
                    currentSortColumn={this.state.sortColumn} currentSortDir={this.state.sortDir} />
                  <GridTh width="6%" title="Cvss" column="cvssScore" onSort={this.onSort}  
                    currentSortColumn={this.state.sortColumn} currentSortDir={this.state.sortDir} />
               
                  <th width="50px">
                    <Link className="add-icon" title="add new"
                    to="#" onClick={handleAdd}><img alt="alt new" src={"./images/add.png"}/> </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {showData.map(item =>    
                
                    <tr key={item.softwareExceptionId} className="grid-row"> 
                   
                        <td>{item.softwareExceptionId}</td>
                        <GridTd  max="100" value={item.exceptionName}></GridTd>
                        <GridTd  max="100" value={item.customerName}></GridTd>
                        <GridTd  max="150" value={`${item.softwareName} ${item.softwareVersion}`}></GridTd>  
                        <GridTd  max="150" value={item.softwareVendor}></GridTd>  
                        
                        <td><CvssRating value={item.cvssScore} type="value" /></td>                
                        
                        <td>
                          <Link className="edit-icon" 
                          style={{ backgroundImage: `url(${process.env.PUBLIC_URL+"/images/edit.png"})` }}
                          title="edit" to="#" onClick={() => handleEdit(item.softwareExceptionId)}>
                            <img alt="edit" src={"./images/edit.png"}/>                           
                          </Link>                          
                          <Link className="delete-icon"                           
                          title="delete" to="#" onClick={() => handleDelete(item.softwareExceptionId)}>  
                          <img alt="delete" src={"./images/delete.png"}/>                       
                          </Link>
                        </td>
                  </tr>
                )}
              </tbody>
            </table>
            </Col>
        </Row>
        <GridPager showStats={true}
        pageNr={this.state.pageNr} 
        pageSize={this.pageSize} 
        totalRowCount = {totalRowCount}
        rowCount={rowCount} 
        onChangePage={(nr) => this.handleChangePage(nr)} />
      </div>
    );
  }  
}

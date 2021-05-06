import React, { Component } from "react";

export class UserName extends Component {
  _isMounted = false;   

  constructor(props) {
    super(props);
       
    this.state = { 
        fetchedData: [], 
        error: "",
        message:"",
        isLoaded : false,
        isLoading: false,           
      };    
    this.LoadData = this.LoadData.bind(this);    
  }
 
  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {    
    if (this._isMounted) {
      this.setState({ isLoaded: false, isLoading:true });
    }       
    this.LoadData();    
  }   

  LoadData()
  {
    let form_data_url = process.env.PUBLIC_URL + `api/User/`;

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
        
      })          
      .catch(error => this.setState({"error": error, isLoaded: true, isLoading:false }));
}

  render() {     

    let data = this.state.fetchedData;

    return <div className="user-name"><b>{data?.userName}</b></div>    
  }  
}

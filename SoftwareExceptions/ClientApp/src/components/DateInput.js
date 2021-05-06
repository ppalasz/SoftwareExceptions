import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export class DateInput extends React.Component {

  constructor(props) {
    super(props);
       
    this.state = { 
      value: this.props.value,
      name: this.props.name,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      onChange: this.props.onChange,
    } 
  }

  onChange = (date) => {

    this.state.onChange({ 
      target: {   
        name: this.state.name,
        value: date
      }
    })

    this.setState({value: date})
  }

  componentDidUpdate(prevProps) {
    if(this.props.disabled !== prevProps.disabled) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
    {
      this.setState({"disabled": this.props.disabled});
    }
  } 

  render() {        
       

    return (
      <div className="date-picker-div">
                  <DatePicker  
                  selected={this.state.value}
                  name={this.state.name}
                  id={this.state.name}
                  dateFormat="yyyy-MM-dd"
                  disabled={this.state.disabled}
                  className="form-control date-input"
                  placeholder={this.state.placeholder} 
                  onChange={date => this.onChange(date)}  
                  />
                   <label htmlFor={this.state.name} className="date-picker-label">                     
                      <i className="bi bi-calendar-date"></i>
                  </label>
                  </div>
    );
  }
}


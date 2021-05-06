import React from "react";

export class CvssRating extends React.Component {


  render() {  

    const {
     value,
     type,    
    } = this.props;
    
    let level = ""
    let backgroundColor = ""
    let color = ""

    if(value<=0.1) {
      level = "None"
      backgroundColor = ""
      color="black"
    }
    else
    if(value<=3.9) {
      level = "Low"
      backgroundColor = "yellow"
      color="black"
    }  
    else
    if(value<=6.9) {
      level = "Medium"
      backgroundColor = "orange"
      color="black"
    }
    else
    if(value<=8.9) {
      level = "High"
      backgroundColor = "red"
      color="white"
    }
    else
    if(value>=9) {
      level = "Critical"
      backgroundColor = "darkred"
      color="white"
    }

    const style = {
      color: color,
      backgroundColor: backgroundColor
    };
 
    if(type==="value")
    {
      return (
        <span className="d-inline ml-2 p-2" 
        style={style} title={level}><b>{value}</b></span>
      );
    }
    else
    {
      return (
        <span className="d-inline ml-2 p-2" 
        style={style} title={value}><b>{level}</b></span>
      );
    }
  }
}


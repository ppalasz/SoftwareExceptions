import React from "react";

export class GridTd extends React.Component {

  

  render() {

    function truncate( str = "", n, useWordBoundary ){

      str = `${str}`

      if (str.length <= n) { return str; }

      const subString = str.substr(0, n-1); // the original check
      return (useWordBoundary 
        ? subString.substr(0, subString.lastIndexOf(" ")) 
        : subString) + " ...";
    };


    const {
     max,
     value,    
    } = this.props;
    
   
    return (
    <td title={value?.length<=max ? "" : value ?? ""  }>{truncate(value ?? "", max, true)} {this.props.children}</td>
    );
  }
}


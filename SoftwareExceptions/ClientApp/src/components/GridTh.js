import React from "react";
import {Link} from "react-router-dom";

export class GridTh extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = { 
      currentSortColumn: props.currentSortColumn,
      currentSortDir: props.currentSortDir,     
    }
  }

  render() {
    const {
     column,
     title,  
     width,
     onSort,
     currentSortColumn,
     currentSortDir,
    } = this.props;    

    let sortedAscClass = `sort_desc-icon ${(currentSortColumn === column) && (currentSortDir === "asc") ? "sorted" : "" }`;
    let sortedDescClass = `sort_desc-icon ${(currentSortColumn === column) && (currentSortDir === "desc") ? "sorted" : "" }`;
   
    return (
      <th width={width}>{title}     
                        <Link className={sortedDescClass}                          
                          title="sort descending" to="#" onClick={() => {                            
                            onSort(column,"desc")
                            }}>  
                          <img alt="sort descendind" src={"./images/sort-descending.png"}/>                       
                        </Link>

                        <Link className={sortedAscClass}                           
                          title="sort ascending" to="#" onClick={() => {
                            onSort(column,"asc")
                            }}>  
                          <img alt="sort ascending" src={"./images/sort-ascending.png"}/>                       
                        </Link>
      </th>
    );
  }
}


import React from "react";
import { Link } from "react-router-dom";
import {  Container, Row, Col } from "react-bootstrap";

export class GridPager extends React.Component {
  render() {
    const {
     rowCount,
     totalRowCount,
     pageSize,
     pageNr,
     showStats=false,
    //baseUrl,
     onChangePage
    } = this.props;
    
    let pageCount= Math.ceil(rowCount/pageSize)
    const links = []

    if(pageCount>1)
    {
      if(pageNr>0)
      {
        links.push(<Link key={`link-first`} className="mr-2" to="#" onClick={() => onChangePage(0)}>&#8403;«</Link>); 
      }
      else
      {
        links.push(<span key={`link-first`} className="mr-2" to="#" >&nbsp;&nbsp;</span>);
      }

      if(pageNr>0)
      {
        links.push(<Link key={`link-prev`} className="mr-2" to="#" onClick={() => onChangePage(pageNr-1)}>«</Link>); 
      }
      else
      {
        links.push(<span key={`link-prev`} className="mr-2" to="#" >&nbsp;</span>);
      }

      for(let i=0;i<pageCount;i++)
      {
          if(i===pageNr)
          {
            links.push(<b key={`link-${i}`} className="mr-2">{i+1}</b>); 
          }
          else {
            links.push(<Link key={`link-${i}`} className="mr-2" to="#" onClick={() => onChangePage(i)}>{i+1}</Link>); 
          }        
      }

      if(pageNr< (pageCount-1))
      {
        links.push(<Link key={`link-next`} className="mr-2" to="#" onClick={() => onChangePage(pageNr+1)}>»</Link>); 
      }
      else
      {
        links.push(<span key={`link-next`} className="mr-2" to="#" >&nbsp;</span>);
      }

      if(pageNr< (pageCount-1))
      {
        links.push(<Link key={`link-last`} className="mr-2" to="#" onClick={() => onChangePage(pageCount-1)}>»&#8403;</Link>); 
      }
      else
      {
        links.push(<span key={`link-last`} className="mr-2" to="#" >&nbsp;&nbsp;</span>);
      }
  }

    let stats = ""
    if(showStats)
      stats = <Row className="grey-fonts">            
                <Col className="col-12 align-items-center text-center">
                  rows: {rowCount}/{totalRowCount} 
                  &nbsp;&nbsp;
                  {pageCount>1 ? `page: ${pageNr+1}/${pageCount}` : "" }
                </Col>
              </Row>

    return (
      <Container>    
        <Row>
          <Col className="col-12 align-items-center text-center pager">
          {links}
          </Col>  
        </Row>
        {stats}
    </Container>
    );
  }
}


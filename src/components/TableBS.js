import React from "react";

// Import React Table
import Table from "react-bootstrap/Table";


const SearchTable = ({ searchResult }) => {
    var cells = [];
    for (let i = 0; i < searchResult.length; i++) {
        const element = searchResult[i];
        cells.push(<tr key={i}>
            <td style={{alignItems: 'center', width: 'auto', maxHeight: '100px'}}>
                <img 
                src={element._links.avatar.href}
                alt=''
                height="30%"
            ></img></td>
            <td style={{textAlign: 'left'}}>Name: {element.first_name + ' ' + element.last_name}<br/>DOB: {element.dob}<br/>Gender: {element.gender}<br/>Status: {element.status}</td>
            <td style={{textAlign: 'left'}}>Phone: {element.phone}<br/>Email: {element.email}<br/>Address: {element.address}<br/>Website: <a href={element.website}>{element.website}</a></td>
          </tr>)
    }

    // console.log('Table props are ', searchResult, cells);
    return (
      <div>
        <Table striped bordered hover>
        <thead>
            <tr>
                <th>Avatar</th>
                <th>Personal details</th>
                <th>Contact details</th>
            </tr>
        </thead>
        <tbody>
            {cells}
        </tbody>
        </Table>
      </div>
    )
}

export default SearchTable;
/*
    Example:
    
 */
import React from 'react';
import MUIDataTable from "mui-datatables";

const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: 'none',
    fixedHeader: true,
    responsive: 'simple',
    rowsPerPageOptions: [10,50,100,1000],
    rowsPerPage: 50,
    sortOrder: {
        name: 'floors',
        direction: 'asc'
      }

};


export default function SuperTableItems(props) {

    const headers = props.headers;

    return <MUIDataTable
        title={''}
        data={props.items.map((item, index) => props.elementContent(item, index))}
        columns={headers}
        options={options}
    />;
}
/*
    Example:
    
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button } from '@material-ui/core';

const options = {
    filter: true,
    filterType: "dropdown",
    selectableRows: 'none',
    fixedHeader: true,
    responsive: 'simple',
    rowsPerPageOptions: [10, 50, 100, 1000],
    rowsPerPage: 50,
    sortOrder: {
        name: 'floors',
        direction: 'asc'
    }

};


export default function SuperTableItems(props) {

    const headers = props.headers.concat([
        {
            name: "id",
            label: ' ',
            options: {
                empty: true,
                sort: false,
                viewColumns: false,
                filter: false,
                customBodyRender: id => {
                    let item = props.items.find(item => item.id === id);
                    let index = props.items.indexOf(item);

                    const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));

                    return editable && <Button
                        color="primary"
                        size="small"
                        className={`edit-${props.name}`}
                        onClick={() => {
                            props.handleEditDialogOpen(item);
                        }} >
                        {props.editButtonName}
                    </Button>
                }
            }
        },
        {
            name: "id",
            label: ' ',
            options: {
                empty: true,
                sort: false,
                filter: false,
                viewColumns: false,
                customBodyRender: id => {

                    let item = props.items.find(item => item.id === id);
                    let index = props.items.indexOf(item);
                    const deletable = ((props.deleteButton(item, item.id) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                    return deletable && <Button
                        aria-label="delete"
                        color="secondary"
                        size="small"
                        className={`delete-${props.name}`}
                        onClick={() => {
                            props.handleDeleteDialogOpen(item)
                        }} >
                        {props.deleteButtonName}
                    </Button>
                }
            }
        }
    ]);


    return <MUIDataTable
        title={''}
        data={props.items.map((item, index) => props.elementContent(item, index))}
        columns={headers}
        options={options}
    />;
}
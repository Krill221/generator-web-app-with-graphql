/*
    Example:
    
 */
import React from 'react';
import {
    TableContainer, TableCell, TableRow, TableHead, Table, Paper, TableBody,
    Button,
} from '@material-ui/core';

export default function TableItems(props) {

    return <TableContainer component={Paper}>
        <Table name={`${props.name}-list`} aria-label="table" size="small">
            <TableHead>
                <TableRow>
                    {props.headers.map((header, index) =>
                        <TableCell key={index} >{header.label}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.items.map((item, index) =>  {

                    const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                    const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                    return <TableRow key={index}>
                        {
                            props.elementContent && props.elementContent(item, index)
                        }
                        <TableCell>
                            {editable &&
                                <Button
                                    color="primary"
                                    size="small"
                                    className={`edit-${props.name}`}
                                    onClick={() => props.handleEditDialogOpen(item.id)}
                                >
                                    {props.editButtonName}
                                </Button>
                            }
                        </TableCell>
                        <TableCell>
                            {deletable &&
                                <Button
                                    aria-label="delete"
                                    color="secondary"
                                    size="small"
                                    className={`delete-${props.name}`}
                                    onClick={() => props.handleDeleteDialogOpen(item.id)}
                                >
                                    {props.deleteButtonName}
                                </Button>
                            }
                        </TableCell>
                </TableRow>
                })}
            </TableBody>
        </Table>
    </TableContainer>;
}
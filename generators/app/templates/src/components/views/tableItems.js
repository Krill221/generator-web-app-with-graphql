/*
    Example:
    
 */
import React from 'react';
import {
    TableContainer, TableCell, TableRow, TableHead, Table, Paper, TableBody,
 } from '@material-ui/core';

export default function TableItems(props) {
    return <TableContainer component={Paper}>
        <Table name={`${props.name}-list`} aria-label="table" size="small">
            <TableHead>
                <TableRow>
                    {props.headers.map((header, index) =>
                        <TableCell key={index} >{header}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {props.items.map((item, index) => <TableRow key={index}>{props.renderItem(item, index)}</TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>;
}
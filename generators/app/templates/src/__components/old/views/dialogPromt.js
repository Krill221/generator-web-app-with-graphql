/*
    Example:
    
 */
import React from 'react';
import {
    Dialog, DialogTitle, DialogActions, Button
} from '@material-ui/core';

export default function DialogPromt(props) {
    return <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle id="alert-delele">{props.dialogName && props.dialogName}</DialogTitle>
        <DialogActions>
            <Button onClick={props.onYes} color="primary" autoFocus>{props.yes}</Button>
            <Button onClick={props.onClose} color="primary">{props.no}</Button>
        </DialogActions>
    </Dialog>
}
/*
    Example:
    
 */
import React from 'react';
import {
    Dialog, DialogTitle, DialogActions
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function DialogPromt({ isOpen, children }) {
    const theme = useTheme();

    return <Dialog open={isOpen} >
        <DialogTitle>{`${theme.props.components.Delete}?`}</DialogTitle>
        <DialogActions>
            {children}
        </DialogActions>
    </Dialog >
}
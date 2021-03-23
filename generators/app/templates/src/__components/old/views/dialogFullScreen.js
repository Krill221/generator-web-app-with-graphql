/*
    Example:
    
 */
import React from 'react';
import {
    Dialog, Toolbar, IconButton, Typography, Slide
} from '@material-ui/core';
import TopAppBar from '../../__views/web/material/helpers/AppBarTop';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';

const TransitionNew = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionEdit = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogFullScreen(props) {
    return <Dialog fullScreen open={props.open}
        onClose={props.onClose}
        TransitionComponent={props.isNew ? TransitionNew : TransitionEdit}
    >
        <TopAppBar position="sticky" >
            <Toolbar>
                <IconButton edge="start" aria-label="back" color="inherit" onClick={props.onClose}>
                    {props.isNew ? <CloseIcon /> : <ArrowBack />}
                </IconButton>
                {
                    props.dialogName &&
                    <Typography noWrap variant="h6">{props.dialogName}</Typography>
                }
            </Toolbar>
        </TopAppBar>
        {props.content}
    </Dialog>
}
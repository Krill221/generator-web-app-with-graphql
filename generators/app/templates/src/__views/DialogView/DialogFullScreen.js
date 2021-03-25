/*
    Example:
    
 */
import React from 'react';
import {
    Dialog, Toolbar, IconButton, Typography, Slide, Container
} from '@material-ui/core';
import TopAppBar from '../AppBarView/AppBarTop';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBack from '@material-ui/icons/ArrowBack';

const TransitionNew = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionEdit = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogFullScreen({ label, isOpen, setActive, isNew = false, children }) {


    return <Dialog
        fullScreen
        open={isOpen}
        //onClose={onClose}
        TransitionComponent={isNew ? TransitionNew : TransitionEdit}
    >
        <TopAppBar position="sticky" >
            <Toolbar>
                <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setActive(false)}>
                    {isNew ? <CloseIcon /> : <ArrowBack />}
                </IconButton>
                {
                    label && <Typography noWrap variant="h6">{label}</Typography>
                }
            </Toolbar>
        </TopAppBar>
        <Container>{children}</Container>
    </Dialog>
}
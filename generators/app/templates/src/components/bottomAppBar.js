/*
    Example:
    <BottomAppBar></BottomAppBar>
 */
import React from 'react';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'sticky',
        bottom: theme.spacing(0),
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        width: '100%'

    },

}));

export default function BottomAppBar(props) {

    const classes = useStyles();
    
    return (
        <Paper square elevation={0} className={classes.appbar} >
            { props.children }
        </Paper >
    )
}
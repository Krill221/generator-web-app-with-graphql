/*
    Example:
    <TopAppBarSecond></TopAppBarSecond>
 */
import React from 'react';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'sticky',
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        width: '100%'

    },

}));

export default function TopAppBarSecond(props) {

    const classes = useStyles();
    const theme = useTheme();
    const is_mobile = !useMediaQuery(theme.breakpoints.up('sm'));
    const mobile_top = theme.spacing(7);
    const pc_top = theme.spacing(8);

    
    return (
        <Paper square elevation={2} style={{top: is_mobile ? mobile_top : pc_top}} className={classes.appbar} >
            { props.children }
        </Paper >
    )
}
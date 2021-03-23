/*
    Example:
    <TopAppBar></TopAppBar>
 */
import React from 'react';
import { Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    appbar: {
        position: 'sticky',
        top: theme.spacing(0),
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        width: '100%'

    },

}));

export default function TopAppBar(props) {

    const classes = useStyles();

    const [scroll, setScroll] = React.useState(false);
    React.useEffect(() => {
        const handleScroll = () => {
            const scrollCheck = window.scrollY > 0;
            if (scrollCheck !== scroll) setScroll(scrollCheck);
        }
        document.addEventListener("scroll", handleScroll)
        return () => document.removeEventListener("scroll", handleScroll);
    }, [scroll]);
    
    return (
        <Paper square elevation={scroll ? 2: 0} className={classes.appbar} >
            { props.children }
        </Paper >
    )
}
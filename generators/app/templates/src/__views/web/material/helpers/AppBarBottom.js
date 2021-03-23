/*
    Example:
    <TopStick></TopStick>
 */
import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mobile: {
        width: '100%',
        position: 'fixed',
        bottom: theme.spacing(0),
        left: theme.spacing(0),
        zIndex: 1000,
    },
    desktop: {
        width: '100%',
        position: 'fixed',
        bottom: theme.spacing(0),
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
    },

}));

export default function TopStick(props) {

    const classes = useStyles();
    const theme = useTheme();
    const is_mobile = !useMediaQuery(theme.breakpoints.up('sm'));

    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollCheck = window.scrollY > 0;
            if (scrollCheck !== scroll) setScroll(scrollCheck);
        }
        document.addEventListener("scroll", handleScroll)
        return () => document.removeEventListener("scroll", handleScroll);
    }, [scroll]);

    return (
        <Paper square elevation={scroll ? 2: 0} className = { is_mobile? classes.mobile : classes.desktop } >
            { props.children }
        </Paper >
    )
}
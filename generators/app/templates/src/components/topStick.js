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
        position: 'sticky',
        top: theme.spacing(0),
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        width: '100%'
    },
    desktop: {
        position: 'sticky',
        top: theme.spacing(8),
        left: theme.spacing(0),
        zIndex: 1000,
        backgroundColor: theme.backgroundColor,
        width: '100%'
    },

}));

export default function TopStick(props) {

    const classes = useStyles();
    const theme = useTheme();
    const is_mobile = !useMediaQuery(theme.breakpoints.up('sm'));

    const [scroll, setScroll] = useState(0);
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
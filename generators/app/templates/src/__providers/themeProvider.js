import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import ruRU from '../locale/ru';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink,
        type: 'dark',
    },
    // TODO to gen
    overrides: {
        MUIDataTable: {
            paper: {
                boxShadow: 'none',
                border: '1px solid rgba(255, 255, 255, 0.12)'
            },
        },
    },
}, ruRU);

const Provider = (props) => {
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
            {props.children}
        </SnackbarProvider>
    </ThemeProvider>
}

export default Provider;

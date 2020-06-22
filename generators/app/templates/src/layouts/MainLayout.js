import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../auth';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

const MainLayout = ({ component: Component, ...rest }) => {
    const { user, logout } = useContext(AuthContext);
    const classes = useStyles();
    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/signin" /> //<Redirect to="/" />
                :
                <React.Fragment>
                    <AppBar position="sticky">
                        <Toolbar id="menu">
                            <Typography variant="h6" id="header" className={classes.title}>
                                Main Layout
                            </Typography>
                            <Button color="inherit" onClick={logout} id='signout'>Sign Out</Button>
                        </Toolbar>
                    </AppBar>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default MainLayout;

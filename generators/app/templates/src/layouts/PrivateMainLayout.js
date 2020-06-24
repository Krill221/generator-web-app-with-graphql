import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import ProfileButtons from './ProfileButtons';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

const Layout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/" /> //<Redirect to="/" />
                :
                <React.Fragment>
                    <AppBar position="sticky">
                        <Toolbar id="menu">
                            <Typography variant="h6" id="header" className={classes.title}>
                                Hotels
                            </Typography>
                            <ProfileButtons />
                        </Toolbar>
                    </AppBar>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default Layout;

import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ProfileButtons from './ProfileButtons';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

const Layout = ({ component: Component, ...rest }) => {
    const classes = useStyles();
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) =>
                    <React.Fragment>
                        <AppBar position="sticky">
                            <Toolbar id="menu">
                                <Button color="inherit" onClick={() => history.push('/')} id='signout'>Hotels</Button>
                                <Typography className={classes.title} variant="h5" noWrap></Typography>
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
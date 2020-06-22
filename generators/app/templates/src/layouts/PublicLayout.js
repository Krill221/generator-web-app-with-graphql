import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../auth';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
}));

const PublicLayout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) =>
                user ? <Redirect to="/" />
                    :
                    <React.Fragment>
                        <AppBar position="sticky">
                            <Toolbar id="menu">
                                <Typography variant="h6" id="header" className={classes.title}>
                                    Public Layout
                                </Typography>
                                <Button color="inherit" onClick={() => history.push('/signin')} id='signout'>SignIn</Button>
                                <Button color="inherit" onClick={() => history.push('/signup')} id='signout'>SignUp</Button>
                            </Toolbar>
                        </AppBar>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default PublicLayout;
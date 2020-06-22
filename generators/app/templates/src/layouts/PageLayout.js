import React, { useContext } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

const PageLayout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/signin" /> //<Redirect to="/" />
                :
                <React.Fragment>
                    <AppBar position="sticky" >
                        <Toolbar id="menu">
                            <IconButton edge="start" aria-label="back" color="inherit" onClick={() => history.push('/') }>
                                <ArrowBack />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default PageLayout;

import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';

const Layout = ({ component: Component, ...rest }) => {
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) => 
                <React.Fragment>
                    <AppBar position="sticky" >
                        <Toolbar id="menu">
                            <IconButton edge="start" aria-label="back" color="inherit" onClick={() => history.goBack() }>
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
export default Layout;

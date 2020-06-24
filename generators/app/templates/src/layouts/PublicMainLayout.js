import React from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ProfileButtons from './ProfileButtons';

const Layout = ({ component: Component, ...rest }) => {
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) =>
                <React.Fragment>
                    <AppBar position="sticky">
                        <Toolbar id="menu">
                            <Button color="inherit" onClick={() => history.push('/')} id='signout'>Hotels</Button>
                            <Typography style={{ flexGrow: 1 }} variant="h5" noWrap />
                            <ProfileButtons />
                        </Toolbar>
                    </AppBar>
                    <Component {...props} />
                    <footer>
                        <Typography variant="h6" align="center" gutterBottom> O-Hotel </Typography>
                        <Typography variant="subtitle2" align="center" color="textSecondary" component="p">© {new Date().getFullYear()} One Hotel, Inc. All rights reserved</Typography>
                    </footer>
                </React.Fragment>
            }
        />
    );
};
export default Layout;
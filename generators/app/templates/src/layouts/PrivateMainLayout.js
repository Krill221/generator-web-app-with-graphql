import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ProfileButtons from './ProfileButtons';

const Layout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    let history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/" /> //<Redirect to="/" />
                :
                <React.Fragment>
                    <AppBar position="sticky">
                        <Toolbar id="menu">
                            <Button color="inherit" onClick={() => history.push('/')} id='signout'>Hotels</Button>
                            <Typography style={{ flexGrow: 1 }} variant="h5" noWrap />
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

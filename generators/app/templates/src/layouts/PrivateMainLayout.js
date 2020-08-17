import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';

const Layout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/" />
                :
                <React.Fragment>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default Layout;

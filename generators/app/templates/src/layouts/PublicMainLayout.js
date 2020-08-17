import React from 'react';
import { Route } from 'react-router-dom';

const Layout = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                <React.Fragment>
                    <Component {...props} />
                </React.Fragment>
            }
        />
    );
};
export default Layout;
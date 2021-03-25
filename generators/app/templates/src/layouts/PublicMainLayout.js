import React from 'react';
import { Route } from 'react-router-dom';
import Footer from './Footer';

const Layout = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                <React.Fragment>
                    <Component {...props} />
                    <Footer/>
                </React.Fragment>
            }
        />
    );
};
export default Layout;
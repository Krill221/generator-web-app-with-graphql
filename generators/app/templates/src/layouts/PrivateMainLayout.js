import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../__providers/authProvider';
import Footer from './Footer';

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
                    <Footer/>
                </React.Fragment>
            }
        />
    );
};
export default Layout;

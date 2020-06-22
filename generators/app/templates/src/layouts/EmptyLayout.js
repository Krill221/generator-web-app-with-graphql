import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../auth';

const MainLayout = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => !user ?
                <Redirect to="/signin" />
                :
                <Component {...props} />
            }
        />
    );
};
export default MainLayout;

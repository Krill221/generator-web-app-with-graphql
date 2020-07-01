import React from 'react';
import { Route } from 'react-router-dom';
import { Typography } from '@material-ui/core';



const Footer = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                    <footer>
                        <Typography variant="h6" align="center" gutterBottom>App</Typography>
                        <Typography variant="subtitle2" align="center" color="textSecondary" component="p">© {new Date().getFullYear()} Inc. All rights reserved</Typography>
                    </footer>
            }
        />
    );
};
export default Footer;
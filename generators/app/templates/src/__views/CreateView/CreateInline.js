import React from 'react';
import { Grid } from '@material-ui/core';

const Create = ({ active, setActive, children }) => {
    return <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} >
            {children}
        </Grid>
    </Grid>
};

export default Create;
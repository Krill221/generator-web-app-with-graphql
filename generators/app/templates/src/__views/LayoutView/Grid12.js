/*
    Example:

 */

import { Grid } from '@material-ui/core';
import React from 'react';

export default function LayoutView({ tabs }) {

    return <Grid container spacing={1} alignItems="flex-end">
        {
            tabs.map((step, index) =>
                <Grid item xs={12} sm={12} md={12} key={index}>
                    {step}
                </Grid>
            )
        }
    </Grid>;
}
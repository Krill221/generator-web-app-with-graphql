/*
    Example:

 */

import { Container, Grid } from '@material-ui/core';
import React from 'react';
import BottomAppBar from '../helpers/AppBarBottom';

export default function SetView({ tabs }) {
    return <Grid container spacing={1} alignItems="flex-end">
        {
            tabs.slice(0, -1).map((step, index) =>
                <Grid item xs={12} sm={12} md={12} key={index}>
                    {step}
                </Grid>
            )
        }
        {
            <BottomAppBar>
                <Container>
                    {tabs[tabs.length - 1]}
                </Container>
            </BottomAppBar>
        }
    </Grid>;
}
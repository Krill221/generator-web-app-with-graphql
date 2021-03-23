/*
    Example:

 */

import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import TopStick from '../helpers/AppBarTopStick';

export default function SetView({ labels, tabs }) {

    return <React.Fragment>
        <TopStick>
            <Container>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={12} sm={12} md={12}></Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>{labels[0]}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}></Grid>
                </Grid>
            </Container>
        </TopStick>
        <div style={{ marginTop: '15px' }} >{tabs[0]}</div>
    </React.Fragment>;
}
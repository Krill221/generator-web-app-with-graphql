/*
    Example:

 */

import { Container, Grid } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import BottomAppBar from '../AppBarView/AppBarBottom';

export default function LayoutView({ tabs }) {

    const divRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(divRef.current.offsetHeight);
    },[]);

    return <Grid container spacing={1} alignItems="flex-end">
        {
            tabs.slice(0, -1).map((step, index) =>
                <Grid item xs={12} sm={12} md={12} key={index}>
                    {step}
                </Grid>
            )
        }
        <div style={{height: height, width: '100%'}} ></div>
        <BottomAppBar>
            <Container ref={divRef}>
                {tabs[tabs.length - 1]}
            </Container>
        </BottomAppBar>
    </Grid>;
}
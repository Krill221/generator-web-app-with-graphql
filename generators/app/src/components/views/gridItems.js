/*
    Example:
    
 */
import React from 'react';
import { Grid } from '@material-ui/core';

export default function GridItems(props) {
    return <Grid name={`${props.name}-list`} container spacing={3} justify="center" alignItems="center">
        { props.items && props.items.map((item, index) => <Grid key={index} item xs={12} sm={6} md={4} >
                {
                    props.renderItem(item, index)
                }
            </Grid>)
        }
        </Grid>
}
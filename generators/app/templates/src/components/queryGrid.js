/*
    Example:

    <QueryGrid
        id={'post'}
        name={'post'}
        query={POSTS_WHERE}
        query_variables={} // not required
        hidden={values.post} // not required
        onCompleted={onComplete} // not required
        renderSkeleton={(item, index) => <div>loading</div> }
        renderItem={(item, index) => <div>{item.name}</div> }
    />
    
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from '@material-ui/core';

export default function QueryGrid(props) {

    const { error, data, loading } = useQuery(props.query, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    //if (loading) return null;
    if (error) console.log(error);
    if (error) return null;
    let items = data ? data[Object.keys(data)[0]] : [];
    //if (props.hidden !== undefined) items = items.filter(item => !props.hidden.includes(item.id));
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return (
        <Grid container spacing={3} justify="center" alignItems="center" id={props.id} >
            { loading &&
                <Grid item xs={12} sm={6} md={4} >
                    {props.renderSkeleton && props.renderSkeleton(0, 0)}
                </Grid>
            }
            {
                !loading && items.map((item, index) => <Grid key={item.id} item xs={12} sm={6} md={4} >
                    {props.renderItem(item, index)}
                </Grid>
                )
            }
        </Grid>
    );
}
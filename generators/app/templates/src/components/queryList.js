/*
    Example:

    <QueryList
        id={'post'}
        name={'post'}
        query={POSTS_WHERE}
        query_variables={} // not required
        hidden={values.post} // not required
        onCompleted={onComplete} // not required
        renderItem={(item, index) => <div>{item.name}</div> }
    />

 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { List } from '@material-ui/core';

export default function QueryList(props) {

    const { error, data } = useQuery(props.query, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    //if (loading) return null;
    if (error) return <p>Error :(</p>;
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(item => !props.hidden.includes(item.id));

    return (
        <List dense={false} id={`${props.name}-list`} name={`${props.name}-list`} >
            {
                items.map((item, index) => props.renderItem(item, index))
            }
        </List>
    );
}
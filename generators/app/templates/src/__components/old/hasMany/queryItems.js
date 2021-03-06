import React from 'react';
import { useQuery } from '@apollo/client';


export default function QueryItems(props) {

    console.log(props.query_variables)

    const { error, data, loading } = useQuery(props.query_where, {
        variables: props.query_variables,
        /*pollInterval: 7000*/
    });
    if (loading) { return null; }
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return <React.Fragment>
        {props.children({ ...props, items: items })}
    </React.Fragment>;
}
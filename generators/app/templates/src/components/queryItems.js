/*
    Example:

    <QueryItems
        name={'post'}
        type={'grid'} // grid, list, raw
        query_where={POSTS_WHERE}
        query_variables={} // not required
        hidden={values.post} // not required
        onCompleted={onComplete} // not required
        renderSkeleton={(item, index) => <div>loading</div> }
        renderItem={(item, index) => <div>{item.name}</div> }
    />
    
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GridItems from './views/gridItems'
import ListItems from './views/listItems'
import RawItems from './views/rawItems'
import TableItems from './views/tableItems'



export default function QueryItems(props) {
    
    const { error, data, loading } = useQuery(props.query_where, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    if (loading) return null;
    if (error) console.log(error);
    if (error) return null;
    
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    if (props.viewType === 'grid') return <GridItems name={props.name} items={items} renderItem={props.renderItem} />;
    if (props.viewType === 'list') return <ListItems name={props.name} items={items} renderItem={props.renderItem} />;
    if (props.viewType === 'table') return <TableItems name={props.name} headers={props.headers} items={items} renderItem={props.renderItem} />;
    return <RawItems name={props.name} items={items} renderItem={props.renderItem} />;

}
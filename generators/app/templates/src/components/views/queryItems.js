/*
    Example:

    <QueryItems
        name={'post'}
        type={'grid'} // grid, list, table, supertable, raw
        renderSkeleton={(item, index) => <div>loading</div> }
        renderItem={(item, index) => <div>{item.name}</div> }
    />
    
 */
import React from 'react';
import GridItems from './gridItems'
import ListItems from './listItems'
import RawItems from './rawItems'
import TableItems from './tableItems'
import SuperTableItems from './superTableItems'


export default function QueryItems(props) {
    if (props.viewType === 'grid') return <GridItems name={props.name} items={props.items} renderItem={props.renderItem} />;
    if (props.viewType === 'table') return <TableItems name={props.name} headers={props.headers} items={props.items} renderItem={props.renderItem} />;
    if (props.viewType === 'list') return <ListItems name={props.name} items={props.items} renderItem={props.renderItem} />;
    if (props.viewType === 'supertable') return <SuperTableItems superTableOptions={props.superTableOptions} name={props.name} label={props.label} headers={props.headers} items={props.items} renderItem={props.renderItem} />;
    return <RawItems name={props.name} items={props.items} renderItem={props.renderItem} />;

}
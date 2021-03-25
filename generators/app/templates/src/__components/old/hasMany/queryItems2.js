/*
    Example:

        <QueryItems2
            viewType={props.viewType}
            query_where={props.query_from}
            query_variables={props.query_from_variables}
            headers={props.headers}
            superTableOptions={props.superTableOptions}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            cardActions={props.cardActions}
            cardCollapse={props.cardCollapse}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            id='item-choose'
            value={props.value}
            hidden={i => !props.value.includes(i.id)}
            onChange={handlePick}
            elementContent={props.elementContent}
        />
    
 */
import React from 'react';
import { useQuery } from '@apollo/client';
import QueryItems from '../views/viewItems'



export default function QueryItems2(props) {

    const handleCardClick = (item) => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.id, value: item.id } });
    };

    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return <QueryItems
            name={props.name}
            viewType={props.viewType}
            items={items}
            headers={props.headers}
            superTableOptions={props.superTableOptions}
            editButton={(item, i) => 'each'}
            deleteButton={(item, i) => 'none'}
            elementContent={props.elementContent}
            cardActions={props.cardActions}
            cardCollapse={props.cardCollapse}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            handleEditDialogOpen={handleCardClick}
            handleDeleteDialogOpen={() => {}}
        />;
}
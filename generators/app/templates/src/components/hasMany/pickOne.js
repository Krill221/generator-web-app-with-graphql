/*
    Example:

    <PickOne
        name='post'
        query={GET_POSTS}
        query_variables={}
        value={props.values.post}
        //hidden={props.values.post}
        onChange={props.handleChange}
        title='name'
        subheader='desc'
        img='img'
        button_name='choose'
    />
    
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import QueryItems from '../views/queryItems'



export default function PickOne(props) {

    const handleCardClick = (id) => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.id, value: id } });
    };

    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);
    //hidden = {i => !props.value.includes(i.id)}

    return <React.Fragment>
        <QueryItems
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
        />
    </React.Fragment>
        ;
}
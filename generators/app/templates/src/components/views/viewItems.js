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
import SwipeItems from './swipeItems'
import GridItems from './gridItems'
import ListItems from './listItems'
import RawItems from './rawItems'
import TableItems from './tableItems'
import SuperTableItems from './superTableItems'


export default function ViewItems(props) {

    if (props.viewType === 'swipe') {
        return <SwipeItems
            name={props.name}
            items={props.items}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            elementContent={props.elementContent}
            cardActions={props.cardActions}
            cardCollapse={props.cardCollapse}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            handleEditDialogOpen={props.handleEditDialogOpen}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
        />;
    }

    if (props.viewType === 'grid') {
        return <GridItems
            name={props.name}
            items={props.items}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            elementContent={props.elementContent}
            cardActions={props.cardActions}
            cardCollapse={props.cardCollapse}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            handleEditDialogOpen={props.handleEditDialogOpen}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
        />;
    }

    if (props.viewType === 'table') {
        return <TableItems
            name={props.name}
            headers={props.headers}
            items={props.items}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            elementContent={props.elementContent}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            handleEditDialogOpen={props.handleEditDialogOpen}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
        />;
    }
    if (props.viewType === 'list') {
        return <ListItems
            name={props.name}
            items={props.items}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            elementContent={props.elementContent}
            deleteButtonName={props.deleteButtonName}
            handleEditDialogOpen={props.handleEditDialogOpen}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
        />;
    }

    if (props.viewType === 'supertable') {
        return <SuperTableItems
            superTableOptions={props.superTableOptions}
            name={props.name}
            headers={props.headers}
            items={props.items}
            editButton={props.editButton}
            deleteButton={props.deleteButton}
            editButtonName={props.editButtonName}
            deleteButtonName={props.deleteButtonName}
            elementContent={props.elementContent}
            handleEditDialogOpen={props.handleEditDialogOpen}
            handleDeleteDialogOpen={props.handleDeleteDialogOpen}
        />;
    }

    return <RawItems
        name={props.name}
        items={props.items}
        elementContent={props.elementContent}
    />;

}
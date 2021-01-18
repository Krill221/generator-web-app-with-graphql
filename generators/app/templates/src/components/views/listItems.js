/*
    Example:
    
 */
import React from 'react';
import { List, ListItem, ListItemSecondaryAction, IconButton, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


export default function ListItems(props) {
    return <List name={`${props.name}-list`} dense={false} >
        {
            props.items && props.items.map((item, index) => {

                const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                return <React.Fragment key={index} >
                    <ListItem
                        button={editable}
                        onClick={() => {
                            if (editable) props.handleEditDialogOpen(item.id);
                        }}
                    >
                        {
                            props.elementContent && props.elementContent(item, index)
                        }
                        <ListItemSecondaryAction>
                            {deletable &&
                                <IconButton
                                    color='secondary'
                                    aria-label="delete"
                                    className={`delete-${props.name}`}
                                    onClick={() => props.handleDeleteDialogOpen(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider light />
                </React.Fragment>
            })
        }
    </List>
}
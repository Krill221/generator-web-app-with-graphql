/*
    Example:

    <CreateManyList
        actionType='create' // 'create' or 'create-default'
        name='comments'
        query_where={GET_COMMENTS_WHERE}
        query_update={UPDATE_COMMENT}
        query_delete={DELETE_COMMENT}
        value={props.values.comments}
        onChange={e => { props.handleChange(e); if (props.values.id !== 'new') { setSave(false); props.submitForm(); } }}
        EditForm={CommentEdit}
        avatar_icon={(item, index) => <></>}
        primary_content={(item, index) => item.name}
        secondary_content={(item, index) => item.desc}
        dialogName="Comment"
        addButtonName="Add Comment"
        deleteButton='each' // can be 'each', 'last', 'none'
        editButton='last' // can be 'each', 'last', 'none'
    />
 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Grid,
    Typography,
    Container, ListItem, ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction,
    Dialog, Button, AppBar, Toolbar, IconButton
} from '@material-ui/core';
import QueryList from './queryList';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBack from '@material-ui/icons/ArrowBack';


export default function СreateManyList(props) {

    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleEditDialogClose = () => { setOpenEdit(false); };

    const handleDelete = (id) => {
        const value = props.value.filter(i => i !== id);
        deleteMutation({
            variables: { id: id },
            refetchQueries: [{ query: props.query_where, variables: { ids: props.value } }]
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        });
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
    }

    const handleChange = (e) => {
        if (currentId === 'new') {
            const value = props.value.concat(e.target.value);
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        }
    }

    const [updateMutation] = useMutation(props.query_update);
    const [deleteMutation] = useMutation(props.query_delete);

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} >
                    {(props.actionType === 'create-default') &&
                        <Button className={`add-${props.name}`} fullWidth variant="contained"
                            onClick={() => updateMutation({ variables: { id: 'new' } }).then(res => {
                                const value = props.value.concat([res.data[Object.keys(res.data)[0]]]);
                                if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
                            })} >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
                    }
                    {(props.actionType === 'create') &&
                        <props.EditForm itemId={'new'} onChange={handleChange} />
                    }
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <QueryList name={props.name}
                        query={props.query_where}
                        query_variables={{ ids: props.value }}
                        renderItem={(item, index) => <React.Fragment key={index}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>{props.avatar_icon ? props.avatar_icon(item, index) : <FolderIcon />}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={props.primary_content ? props.primary_content(item, index) : ''} secondary={props.secondary_content ? props.secondary_content(item, index) : ''} />
                                <ListItemSecondaryAction>
                                    {props.editButton && ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0))) &&
                                            <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); handleEditDialogOpen(); }} >
                                                <EditIcon />
                                            </IconButton>
                                    }
                                    {props.deleteButton && (props.deleteButton(item, index) === 'each' || props.deleteButton(item, index) === true) &&
                                        <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    {props.deleteButton && (props.deleteButton(item, index) === 'last' && (index === 0)) &&
                                        <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                </ListItemSecondaryAction>
                            </ListItem>
                            {props.item_devider && props.item_devider}
                        </React.Fragment>
                        }
                    />
                </Grid>
            </Grid>
            {(props.actionType === 'create') &&
                <Dialog fullScreen open={openEdit} onClose={handleEditDialogClose}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" aria-label="back" color="inherit" onClick={handleEditDialogClose}>
                                <ArrowBack />
                            </IconButton>
                            {
                                props.dialogName &&
                                <Typography noWrap variant="h6">{props.dialogName}</Typography>
                            }
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <props.EditForm itemId={currentId} onChange={handleChange} onSave={handleEditDialogClose} onDelete={handleEditDialogClose} />
                    </Container>
                </Dialog>
            }
        </React.Fragment>
    );
}
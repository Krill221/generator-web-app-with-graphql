/*
    Example:

    <CreateManyListDialog
        actionType='create' // 'create' or 'create-default'
        name='comments'
        query_where={GET_COMMENTS_WHERE}
        query_update={UPDATE_COMMENT}
        query_delete={DELETE_COMMENT}
        hidden={[]} // not requared
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
    Dialog, Button, AppBar, Toolbar, IconButton, DialogTitle, DialogActions
} from '@material-ui/core';
import QueryList from './queryList';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBack from '@material-ui/icons/ArrowBack';


export default function СreateManyListDialog(props) {

    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleEditDialogClose = () => { setOpenEdit(false); };

    const handleDelete = () => {
        const value = props.value.filter(i => i !== currentId);
        deleteMutation({
            variables: { id: currentId },
            refetchQueries: [{ query: props.query_where, variables: { ids: props.value } }]
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        });
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        setDeleteDialog(false);
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
                    <QueryList name={props.name}
                        query={props.query_where}
                        query_variables={{ ids: props.value }}
                        hidden={props.hidden}
                        renderItem={(item, index) => <ListItem key={index}>
                            {props.avatar_icon &&
                                < ListItemAvatar >
                                    <Avatar>{props.avatar_icon ? props.avatar_icon(item, index) : <FolderIcon />}</Avatar>
                                </ListItemAvatar>
                            }
                            <ListItemText primary={props.primary_content ? props.primary_content(item, index) : ''} secondary={props.secondary_content ? props.secondary_content(item, index) : ''} />
                            <ListItemSecondaryAction>
                                {((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) &&
                                    <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); handleEditDialogOpen(); }} >
                                        <EditIcon />
                                    </IconButton>
                                }
                                {(props.deleteButton === 'each') &&
                                    <IconButton color='secondary' edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                {(props.deleteButton === 'last' && (index === 0)) &&
                                    <IconButton color='secondary' edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    {(props.actionType === 'create-default') &&
                        <Button className={`add-${props.name}`} fullWidth variant="contained"
                            onClick={() => updateMutation({ variables: { id: 'new' } }).then(res => {
                                const value = props.value.concat([res.data[Object.keys(res.data)[0]]]);
                                if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
                            })} >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
                    }
                    {(props.actionType === 'create') &&
                        <Button color="secondary" className={`add-${props.name}`} onClick={() => { setCurrentId('new'); handleEditDialogOpen(); }} fullWidth variant="contained" >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
                    }
                </Grid>
            </Grid>
            {
                (props.actionType === 'create') &&
                <Dialog fullScreen open={openEdit} onClose={handleEditDialogClose}>
                    <AppBar position="sticky" >
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
                        {
                            /*
                                <props.EditForm itemId={currentId} onChange={handleChange} onSave={handleEditDialogClose} onDelete={handleEditDialogClose} />
                            */
                        }
                        {
                            props.EditForm({ ...props, itemId: currentId, onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                        }
                    </Container>
                </Dialog>
            }
            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                aria-labelledby="delele"
                aria-describedby="delete"
            >
                <DialogTitle id="alert-delele">{"Удалить?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDelete} color="primary" autoFocus>Да</Button>
                    <Button onClick={() => setDeleteDialog(false)} color="primary">Нет</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment >
    );
}
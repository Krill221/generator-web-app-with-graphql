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
        actionTypeButton='fab' // floating button create
        deleteButton='each' // can be 'each', 'last', 'none'
        editButton='last' // can be 'each', 'last', 'none'
    />

 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Typography, ListItem, ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction,
    Dialog, Button, AppBar, Toolbar, IconButton, DialogTitle, DialogActions, Fab, Divider
} from '@material-ui/core';
import QueryList from './queryList';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    },
}));

export default function СreateManyListDialog(props) {

    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleEditDialogClose = () => { setOpenEdit(false); };
    const classes = useStyles();


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
            <QueryList name={props.name}
                query={props.query_where}
                query_variables={{ ids: props.value }}
                hidden={props.hidden}
                renderItem={(item, index) => <React.Fragment key={index}><ListItem
                    button={((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) ? true : false}
                    onClick={() => {
                        if ((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) {
                            setCurrentId(item.id); handleEditDialogOpen();
                        }
                    }}
                >
                    {props.avatar_icon &&
                        < ListItemAvatar >
                            <Avatar>{props.avatar_icon ? props.avatar_icon(item, index) : <FolderIcon />}</Avatar>
                        </ListItemAvatar>
                    }
                    <ListItemText primary={props.primary_content ? props.primary_content(item, index) : ''} secondary={props.secondary_content ? props.secondary_content(item, index) : ''} />
                    <ListItemSecondaryAction>
                        {((props.deleteButton === 'each') || (props.deleteButton === 'last' && (index === 0))) &&
                            <IconButton color='secondary' aria-label="delete" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >
                                <DeleteIcon />
                            </IconButton>
                        }
                    </ListItemSecondaryAction>
                </ListItem>
                    <Divider light />
                </React.Fragment>
                }
            />
            {(props.actionType === 'create-default') &&
                <Button className={`add-${props.name}`} fullWidth variant="contained"
                    onClick={() => updateMutation({ variables: { id: 'new' } }).then(res => {
                        const value = props.value.concat([res.data[Object.keys(res.data)[0]]]);
                        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
                    })} >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
            }
            {(props.actionType === 'create') && props.actionTypeButton === 'fab' &&
                <Fab color="secondary" variant='extended' aria-label="add" className={classes.fab}
                    onClick={() => { setCurrentId('new'); handleEditDialogOpen(); }}
                >
                    <AddIcon />
                    {props.addButtonName !== undefined && props.addButtonName}
                </Fab>
            }
            {(props.actionType === 'create') && props.actionTypeButton !== 'fab' &&
                <Button color="secondary" className={`add-${props.name}`} onClick={() => { setCurrentId('new'); handleEditDialogOpen(); }} fullWidth variant="contained" >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
            }

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
                    {
                        props.EditForm({ ...props, itemId: currentId, onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                    }
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
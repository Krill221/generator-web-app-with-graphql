/*
    Example:

    <CreateManyGridDialog
    actionType='create' // 'create' or 'create-default' or ''
    name='comments'
    query_where={GET_COMMENTS_WHERE}
    query_update={UPDATE_COMMENT}
    query_delete={DELETE_COMMENT}
    value={props.values.comments}
    onChange={e => { props.handleChange(e); if (props.values.id !== 'new') { setSave(false); props.submitForm(); } }}
    EditForm={CommentEdit}
    cardHeader={(item, index) => <CardHeader
        avatar={<Avatar>R</Avatar>}
        action={<IconButton aria-label="settings"><MoreVertIcon /></IconButton>}
        title="Title"
        subheader="September 14, 2017"
    />} // or null
    cardMedia={(item, index) => item.avatar} // or null
    cardContent={(item, index) => <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
        <Typography variant="body2" component="p">{item.comments.length} comments</Typography>
    </CardContent> // or null
    cardActions={(item, index) =>
        <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
    } // or null
    dialogName="Comment"
    actionTypeButton='fab' // floating button create
    addButtonName="Add Comment"
    editButtonName="Edit"
    deleteButtonName="Delete"
    deleteButton='each' // can be 'each', 'last', 'none'
    editButton='last' // can be 'each', 'last', 'none'
    />

 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Grid, Card, CardMedia, CardActions,
    Dialog, Button, AppBar, Toolbar, IconButton, Typography, Fab,
    DialogTitle, DialogActions
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import QueryGrid from './queryGrid';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    },
}));


export default function CreateManyGridDialog(props) {
    const classes = useStyles();

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
                    <QueryGrid name={props.name}
                        query={props.query_where}
                        query_variables={{ ids: props.value }}
                        renderItem={(item, index) => <Card>
                            {
                                props.cardHeader && props.cardHeader(item, index)
                            }
                            {
                                props.cardMedia &&
                                <CardMedia
                                    component="img"
                                    alt=""
                                    height="170"
                                    image={props.cardMedia(item, index)}
                                    title=""
                                />
                            }
                            {
                                props.cardContent && props.cardContent(item, index)
                            }
                            <CardActions>
                                {props.cardActions && props.cardActions(item, index)}
                                {((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) &&
                                    <Button aria-label="edit" color="primary" size="small" className={`edit-${props.name}`} onClick={() => { setCurrentId(item.id); handleEditDialogOpen(); }} >{props.editButtonName}</Button>
                                }
                                {((props.deleteButton === 'each') || (props.deleteButton === 'last' && (index === 0))) &&
                                    <Button aria-label="delete" color="secondary" size="small" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >{props.deleteButtonName}</Button>
                                }
                            </CardActions>
                        </Card>
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
                </Grid>
            </Grid>
            {(props.actionType === 'create') &&
                <Dialog fullScreen open={openEdit} onClose={handleEditDialogClose}>
                    <AppBar position="sticky">
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
                    <props.EditForm itemId={currentId} onChange={handleChange} onSave={handleEditDialogClose} onDelete={handleEditDialogClose} />
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
        </React.Fragment>
    );
}

/*
    Example:

    <CreateMany
        name='hotels'
        actionType='create' // can be create create-default none
        viewType='grid' // can be grid list table raw
        withUrl={false} // set url
        query_where={GET_HOTELS}
        query_variables={{ids: props.values.hotels}}
        query_update={UPDATE_HOTEL}
        query_delete={DELETE_HOTEL}
        onChange={e => { props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
        EditForm={EditHotel}
        CreateForm={CreateHotel}
        headers={['header 1','header 2']} // if table
        elementContent={(item, index) =>
            <React.Fragment>
                <CardHeader
                    avatar={<Avatar src={item.logo}></Avatar>}
                    action={''}
                    title={item.name}
                    subheader=""
                />
                <CardMedia
                    component="img"
                    alt=""
                    height="200"
                    image={item.facade}
                    title=""
                />
            </React.Fragment>
        }
        elementContent={(item, index) => <React.Fragment>
                <ListItemAvatar>
                    <Avatar alt='' className={classes.large} src={item.picture} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                    secondary={item.name} />
            </React.Fragment>
        }
        elementContent={(item, index) => <React.Fragment>
                <TableCell>
                    {item.name}
                </TableCell>
            </React.Fragment>
        }
        cardActions={(item, index) => null}
        dialogName=""
        actionTypeButton='fab' // can be fab button inline(view create inline) none
        deleteButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
        editButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
        addButtonName="Добавить"
        editButtonName="Редактировать"
        deleteButtonName="Удалить"
    />
    
 */

import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
    Grid, Card, CardActions,
    Dialog, Button, Toolbar, IconButton, Typography, Fab,
    DialogTitle, DialogActions, ListItem, ListItemSecondaryAction, Divider, TableCell
} from '@material-ui/core';
import TopAppBar from './topAppBar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import QueryItems from './queryItems';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, Link, useLocation } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    },
    pointer: {
        cursor: 'pointer'
    }
}));


export default function CreateMany(props) {

    const classes = useStyles();

    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);

    const [currentId, setCurrentId] = React.useState('new');

    const history = useHistory();

    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleCreateDialogOpen = () => { setOpenCreate(true); };
    const handleEditDialogClose = () => {
        if (props.withUrl === true) {
            history.goBack();
        }
        setOpenEdit(false);
        setOpenCreate(false);
    };

    const [deleteMutation] = useMutation(props.query_delete);
    const handleDelete = () => {
        const ids = props.query_variables.filter(i => i !== currentId);
        deleteMutation({
            variables: { id: currentId },
            refetchQueries: [{ query: props.query_where, variables: { ids: props.query_variables } }]
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        setDeleteDialog(false);
    }

    const { refetch } = useQuery(props.query_where, { skip: true });

    const handleChange = (e) => {
        const ids = props.query_variables.concat(e.target.value).filter((el, i, a) => i === a.indexOf(el));
        refetch({ variables: { ids: ids } });
        if (currentId === 'new') {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        }
    }

    const [updateMutation] = useMutation(props.query_update, {
        refetchQueries: [{ query: props.query_where, variables: { ids: props.query_variables } }],
        variables: { id: 'new' },
        onCompleted: (data) => {
            const ids = props.query_variables.concat([data[Object.keys(data)[0]]]);
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        }
    });

    const location = useLocation();
    React.useEffect(() => {
        if (props.withUrl) {
            const locationArr = location.pathname.split('/');
            const id = locationArr[locationArr.length - 1];

            if (id !== props.name) {
                setCurrentId(id);
                handleEditDialogOpen();
            } else {
                setOpenEdit(false);
                setOpenCreate(false);
            }
        }
    }, [props.withUrl, location.pathname, props.name]);

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                {props.actionTypeButton === 'inline' &&
                    <Grid item xs={12} sm={12} md={12} >
                        {
                            props.CreateForm !== undefined ?
                                props.CreateForm({ ...props, itemId: 'new', onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                                :
                                props.EditForm({ ...props, itemId: 'new', onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                        }
                    </Grid>

                }
                <Grid item xs={12} sm={12} md={12} >
                    {
                        props.viewType === 'grid' && <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            query_where={props.query_where}
                            query_variables={props.query_variables}
                            renderItem={(item, index) => <Card
                                className={
                                    ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true)) && classes.pointer
                                }
                                onClick={() => {
                                    if ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true)) {
                                        if (props.withUrl !== true) {
                                            setCurrentId(item.id);
                                            handleEditDialogOpen();
                                        } else {
                                            history.push(`/${props.name}/${item.id}`);
                                        }
                                    }
                                }}>
                                {
                                    props.elementContent && props.elementContent(item, index)
                                }
                                <CardActions>
                                    {props.cardActions && props.cardActions(item, index)}
                                    
                                    {((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true)) &&
                                        <Button aria-label="delete" color="secondary" size="small" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >{props.deleteButtonName}</Button>
                                    }
                                </CardActions>
                            </Card>
                            }
                        />
                    }
                    {
                        props.viewType === 'table' && <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            headers={props.headers.concat(['', ''])}
                            query_where={props.query_where}
                            query_variables={props.query_variables}
                            renderItem={(item, index) => <React.Fragment>
                                {
                                    props.elementContent && props.elementContent(item, index)
                                }
                                <TableCell>
                                    {((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true)) &&
                                        <Button
                                            color="primary"
                                            size="small"
                                            className={`edit-${props.name}`}
                                            component={Link}
                                            to={`/${props.name}/${item.id}`}
                                            onClick={() => {
                                                if (props.withUrl !== true) {
                                                    setCurrentId(item.id);
                                                    handleEditDialogOpen();
                                                } else {
                                                    history.push(`/${props.name}/${item.id}`);
                                                }
                                            }}
                                        >
                                            {props.editButtonName}
                                        </Button>
                                    }
                                </TableCell>
                                <TableCell>
                                    {((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true)) &&
                                        <Button aria-label="delete" color="secondary" size="small" className={`delete-${props.name}`} onClick={() => { setCurrentId(item.id); setDeleteDialog(true) }} >{props.deleteButtonName}</Button>
                                    }
                                </TableCell>
                            </React.Fragment>
                            }
                        />
                    }
                    {
                        props.viewType === 'list' && <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            query_where={props.query_where}
                            query_variables={props.query_variables}
                            renderItem={(item, index) => <React.Fragment>
                                <ListItem
                                    button={((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true)) ? true : false}
                                    onClick={() => {
                                        if ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true)) {
                                            if (props.withUrl !== true) {
                                                setCurrentId(item.id); handleEditDialogOpen();
                                            } else {
                                                history.push(`/${props.name}/${item.id}`);
                                            }
                                        }
                                    }}
                                >
                                    {
                                        props.elementContent && props.elementContent(item, index)
                                    }
                                    <ListItemSecondaryAction>
                                        {((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true)) &&
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
                    }
                </Grid>

                <Grid item xs={12} sm={12} md={12} >

                    {props.actionTypeButton === 'fab' && <React.Fragment>
                        {
                            props.actionType === 'create' &&
                            <Fab
                                color="secondary"
                                variant='extended'
                                aria-label="add"
                                className={classes.fab}
                                onClick={() => {
                                    setCurrentId('new'); handleCreateDialogOpen();
                                }}
                            ><AddIcon />{props.addButtonName !== undefined && props.addButtonName}</Fab>

                        }
                        {
                            props.actionType === 'create-default' &&
                            <Fab
                                color="secondary"
                                variant='extended'
                                aria-label="add"
                                className={classes.fab}
                                onClick={() => updateMutation()}
                            ><AddIcon />{props.addButtonName !== undefined && props.addButtonName}</Fab>
                        }
                    </React.Fragment>
                    }

                    {
                        props.actionTypeButton === 'button' && <React.Fragment>
                            {props.actionType === 'create' &&
                                <Button
                                    color="secondary"
                                    className={`add-${props.name}`}
                                    fullWidth
                                    variant="contained"
                                    onClick={() => {
                                        setCurrentId('new');
                                        handleCreateDialogOpen();
                                    }}
                                >
                                    {props.addButtonName !== undefined ? props.addButtonName : 'add'}
                                </Button>
                            }
                            {
                                props.actionType === 'create-default' &&
                                <Button
                                    color="secondary"
                                    className={`add-${props.name}`}
                                    fullWidth
                                    variant="contained"
                                    onClick={() => updateMutation()}
                                >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
                            }
                        </React.Fragment>
                    }

                </Grid>
            </Grid>
            {
                (props.actionType === 'create') &&
                <Dialog fullScreen open={openEdit} onClose={handleEditDialogClose}>
                    <TopAppBar position="sticky" >
                        <Toolbar>
                            <IconButton edge="start" aria-label="back" color="inherit" onClick={handleEditDialogClose}>
                                <ArrowBack />
                            </IconButton>
                            {
                                props.dialogName &&
                                <Typography noWrap variant="h6">{props.dialogName}</Typography>
                            }
                        </Toolbar>
                    </TopAppBar>
                    {
                        props.EditForm({ ...props, itemId: currentId, onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                    }
                </Dialog>
            }
            {
                (props.actionType === 'create') &&
                <Dialog fullScreen open={openCreate} onClose={handleEditDialogClose}>
                    <TopAppBar position="sticky" >
                        <Toolbar>
                            <IconButton edge="start" aria-label="back" color="inherit" onClick={handleEditDialogClose}>
                                <ArrowBack />
                            </IconButton>
                            {
                                props.dialogName &&
                                <Typography noWrap variant="h6">{props.dialogName}</Typography>
                            }
                        </Toolbar>
                    </TopAppBar>
                    {
                        props.CreateForm !== undefined ?
                            props.CreateForm({ ...props, itemId: currentId, onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                            :
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
        </React.Fragment>
    );

}
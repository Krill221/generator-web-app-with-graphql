/*
    Example:

    import CreateMany from '../../components/createMany';

    <CreateMany
                        name={models}
                        label='Users'
                        viewType='list' // can be grid list table supertable raw
                        superTableOptions={superTableOptions}
                        query_where={GETS}
                        query_variables={{ ids: [] }}
                        query_update={UPDATE}
                        query_delete={DELETE}
                        onChange={(e) => { }}
                        withUrl={true} // use url
                        EditForm={(Edit)}
                        CreateForm={Create}
                        headers={headers}
                        elementContent={(item, index) => {

                            // grid
                            return <React.Fragment>
                                <CardHeader
                                    avatar={<Avatar src={item.usename}></Avatar>}
                                    action={''}
                                    title={item.username}
                                    subheader=""
                                />
                                <CardMedia
                                    component="img"
                                    alt=""
                                    height="200"
                                    image={item.username}
                                    title=""
                                />
                            </React.Fragment>

                            // list
                            return <React.Fragment>
                                <ListItemAvatar>
                                    <Avatar alt='' src={item.picture} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.username}
                                    secondary={item.email} />
                            </React.Fragment>
                            
                            // table
                            /*return <React.Fragment>
                                <TableCell>
                                    {item.username}
                                </TableCell>
                                <TableCell>
                                    {item.email}
                                </TableCell>
                            </React.Fragment>


                            // supertable
                            return item;

                            // raw
                            //return <React.Fragment>item</React.Fragment>;
                        }}
                        cardActions={(item, index) => null}
                        dialogName=''
                        actionType='create' // create or create-default
                        addButtonType='fab' // can be fab button inline none
                        addButtonName={theme.props.components.Add}
                        editButtonName={theme.props.components.Edit}
                        deleteButtonName={theme.props.components.Delete}
                        deleteButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                        editButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                    />

 */

import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useQuery, useMutation } from '@apollo/react-hooks';
//import ApolloCacheUpdater from "apollo-cache-updater";
import {
    Grid, Card, CardActions,
    Button, IconButton, Fab,
    ListItem, ListItemSecondaryAction, Divider, TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import QueryItems from './views/queryItems';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from "react-router-dom";
import DialogFullScreen from './views/dialogFullScreen';
import DialogPromt from './views/dialogPromt';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    },
    pointer: {
        cursor: 'pointer'
    },
}));


export default function CreateMany(props) {
    const pathname = window.document.location.pathname;
    const parent_url = '/' + pathname.split('/')[1];

    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    const [deleteMutation] = useMutation(props.query_delete);
    const [updateMutation] = useMutation(props.query_update);


    const handleAddButton = () => {
        if (props.actionType === 'create') {
            setCurrentId('new');
            handleCreateDialogOpen();
        } else {
            handleCreate({ target: { value: { id: 'new' } } })
        }
    }

    const handleEditDialogOpen = (id) => {
        if (props.withUrl !== true) {
            setCurrentId(id);
            setOpenEdit(true);
        } else {
            history.push(`/${props.name}/${id}`);
        }
    };
    const handleEditDialogClose = () => {
        if (props.withUrl === true) history.push(parent_url);
        setOpenEdit(false);
    };
    const handleDeleteDialogOpen = (id) => {
        setCurrentId(id); setDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    };
    const handleCreateDialogOpen = () => { setOpenCreate(true); };
    const handleCreateDialogClose = () => { setOpenCreate(false); };
    const handleDelete = () => {
        const ids = props.query_variables.ids.filter(i => i !== currentId);
        deleteMutation({
            variables: { id: currentId },
            update: (proxy) => {
                try {
                    const vars = ids.length !== 0 ? ids : {};
                    const items = proxy.readQuery({
                        query: props.query_where,
                        variables: vars,
                    });
                    const key = Object.keys(items)[0];
                    items[key] = items[key].filter(item => item.id !== currentId);
                    proxy.writeQuery({
                        query: props.query_where,
                        variables: vars,
                        data: items
                    });
                } catch (error) { console.error(error); }
            },
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
        setDeleteDialog(false);
    }
    const handleUpdate = (e) => {
        const ids = props.query_variables.ids.concat(e.target.value.id).filter((el, i, a) => i === a.indexOf(el));
        updateMutation({
            variables: e.target.value
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
    }
    const handleCreate = (e) => {
        const ids = props.query_variables.ids.concat(e.target.value.id).filter((el, i, a) => i === a.indexOf(el));
        updateMutation({
            variables: e.target.value,
            update: (proxy, { data }) => {
                const vars = ids.length !== 0 ? ids : {};
                const items = proxy.readQuery({ query: props.query_where, variables: vars });
                const key = Object.keys(data)[0];
                const newItem = data[key];
                const key2 = Object.keys(items)[0];
                items[key2].unshift(newItem);
                proxy.writeQuery({ query: props.query_where, variables: vars, data: items });
            },
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
        handleEditDialogClose();
        handleCreateDialogClose();
    }

    React.useEffect(() => {
        if (props.withUrl) {
            const locationArr = pathname.split('/');
            if (locationArr[1] === props.name) {
                const id = locationArr[locationArr.length - 1];
                if (id !== props.name) {
                    setCurrentId(id);
                    setOpenEdit(true);
                } else {
                    setOpenEdit(false);
                    setOpenCreate(false);
                }
            }
        }
    }, [props.withUrl, pathname, props.name]);


    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);


    let currentItem = { id: 'new' };
    if (currentId !== 'new') {
        currentItem = items.find(item => item.id === currentId);
        if (currentItem === undefined) {
            currentItem = { id: 'new' };
        }
    }

    const headers = props.headers.concat([
        {
            name: "id",
            label: ' ',
            options: {
                empty: true,
                sort: false,
                viewColumns: false,
                filter: false,
                customBodyRender: id => {
                    const editable = ((props.editButton('', '') === 'each') || (props.editButton('', '') === true));
                    return editable && <Button
                        color="primary"
                        size="small"
                        className={`edit-${props.name}`}
                        onClick={() => handleEditDialogOpen(id)}
                    >
                        {props.editButtonName}
                    </Button>
                }
            }
        },
        {
            name: "id",
            label: ' ',
            options: {
                empty: true,
                sort: false,
                filter: false,
                viewColumns: false,
                customBodyRender: id => {
                    const deletable = ((props.deleteButton('', '') === 'each') || (props.deleteButton('', '') === true));
                    return deletable && <Button
                        aria-label="delete"
                        color="secondary"
                        size="small"
                        className={`delete-${props.name}`}
                        onClick={() => { setCurrentId(id); setDeleteDialog(true) }} >
                        {props.deleteButtonName}
                    </Button>
                }
            }
        }
    ]);

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                {props.addButtonType === 'inline' &&
                    <Grid item xs={12} sm={12} md={12} >
                        {
                            props.CreateForm({ addButtonName: props.addButtonName, item: currentItem, afterSubmit: handleCreate })
                        }
                    </Grid>
                }
                {props.addButtonType === 'fab' && <Fab
                    color="secondary"
                    variant='extended'
                    aria-label="add"
                    className={classes.fab}
                    onClick={handleAddButton}
                ><AddIcon />{props.addButtonName !== undefined && props.addButtonName}</Fab>
                }
                {props.addButtonType === 'button' && <Grid item xs={12} sm={12} md={12} >
                    <Button
                        color="default"
                        className={`add-${props.name}`}
                        fullWidth
                        variant="outlined"
                        onClick={handleAddButton}
                    >
                        {props.addButtonName !== undefined ? props.addButtonName : 'add'}
                    </Button>
                </Grid>
                }

                <Grid item xs={12} sm={12} md={12} >
                    {
                        props.viewType === 'grid' && <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            items={items}
                            renderItem={(item, index) => {
                                const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                                const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                                return <Card variant="outlined"
                                    className={editable ? classes.pointer : ''}
                                >
                                    <div
                                        onClick={() => { if (editable) handleEditDialogOpen(item.id) }}
                                    >
                                        {
                                            props.elementContent && props.elementContent(item, index)
                                        }
                                    </div>
                                    <CardActions disableSpacing>
                                        {props.cardActions && props.cardActions(item, index)}

                                        {deletable &&
                                            <Button
                                                aria-label="delete"
                                                color="secondary"
                                                size="small"
                                                className={`delete-${props.name}`}
                                                onClick={() => handleDeleteDialogOpen(item.id)}
                                            >
                                                {props.deleteButtonName}
                                            </Button>
                                        }
                                    </CardActions>
                                    <React.Fragment>
                                        {props.cardCollapse && props.cardCollapse(item, index)}
                                    </React.Fragment>
                                </Card>
                            }}
                        />
                    }
                    {
                        props.viewType === 'table' && <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            headers={props.headers.concat(['', ''])}
                            items={items}
                            renderItem={(item, index) => {
                                const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                                const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                                return <React.Fragment>
                                    {
                                        props.elementContent && props.elementContent(item, index)
                                    }
                                    <TableCell>
                                        {editable &&
                                            <Button
                                                color="primary"
                                                size="small"
                                                className={`edit-${props.name}`}
                                                onClick={() => handleEditDialogOpen(item.id)}
                                            >
                                                {props.editButtonName}
                                            </Button>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {deletable &&
                                            <Button
                                                aria-label="delete"
                                                color="secondary"
                                                size="small"
                                                className={`delete-${props.name}`}
                                                onClick={() => handleDeleteDialogOpen(item.id)}
                                            >
                                                {props.deleteButtonName}
                                            </Button>
                                        }
                                    </TableCell>
                                </React.Fragment>
                            }}
                        />
                    }
                    {
                        props.viewType === 'supertable' &&
                        <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            headers={headers}
                            superTableOptions={props.superTableOptions}
                            items={items}
                            renderItem={(item, index) => {
                                return props.elementContent && props.elementContent(item, index)
                            }}
                        />
                    }
                    {
                        props.viewType === 'list' &&
                        <QueryItems
                            name={props.name}
                            viewType={props.viewType}
                            items={items}
                            renderItem={(item, index) => {
                                const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                                const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                                return <React.Fragment>
                                    <ListItem
                                        button={editable}
                                        onClick={() => {
                                            if (editable) handleEditDialogOpen(item.id);
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
                                                    onClick={() => handleDeleteDialogOpen(item.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider light />
                                </React.Fragment>
                            }}
                        />
                    }
                    {
                        props.viewType === 'raw' && <QueryItems
                            name={props.name}
                            items={items}
                            viewType={props.viewType}
                            renderItem={(item, index) => props.elementContent && props.elementContent(item, index)}
                        />
                    }
                </Grid>
            </Grid>



            {
                (props.actionType === 'create') &&
                <React.Fragment>
                    <DialogFullScreen
                        isNew={false}
                        open={openEdit}
                        onClose={handleEditDialogClose}
                        dialogName={props.dialogName}
                        content={
                            props.EditForm({
                                item: currentItem,
                                afterSubmit: handleUpdate
                            })
                        }
                    />
                    <DialogFullScreen
                        isNew={true}
                        open={openCreate}
                        onClose={handleCreateDialogClose}
                        dialogName={props.dialogName}
                        content={
                            props.CreateForm({
                                addButtonName: props.addButtonName,
                                item: currentItem,
                                afterSubmit: handleCreate
                            })}
                    />
                </React.Fragment>
            }

            <DialogPromt
                open={deleteDialog}
                onClose={handleDeleteDialogClose}
                dialogName={`${theme.props.components.Delete}?`}
                onYes={handleDelete}
                yes={theme.props.components.Yes}
                no={theme.props.components.No}
            />

        </React.Fragment>
    );

}
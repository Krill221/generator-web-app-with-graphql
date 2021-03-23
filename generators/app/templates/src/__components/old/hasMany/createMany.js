
/*
    Example:

import CreateMany from '../../components/hasMany/createMany';

<CreateMany
                        name={models}
                        viewType='supertable' // can be grid list table supertable swipe raw
                        superTableOptions={superTableOptions}
                        query_where={GETS_WHERE}
                        query_variables={{ ids: props.values.members }}
                        query_update={UPDATE}
                        query_delete={DELETE}
                        onChange={e => { props.handleChange(e); props.submitForm(); }}
                        withUrl={false} // use url
                        EditForm={(Edit)}
                        CreateForm={Create}
                        headers={headers}
                        elementContent={(item, index) => {

                            // swipe
                            return <React.Fragment>
                                <CardMedia
                                    className={classes.media}
                                    image={item.img1}
                                    title="Paella"
                                />
                            </React.Fragment>

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
                            return <React.Fragment>
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
                            return <React.Fragment>item</React.Fragment>;
                        }}
                        cardActions={(item, index) => null}
                        cardCollapse={(item, index) => null}
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
import { useMutation } from '@apollo/client';
import {
    Grid,
    Button, Fab,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ViewItems from '../views/viewItems';
import { useHistory } from "react-router-dom";
import DialogFullScreen from '../views/dialogFullScreen';
import DialogPromt from '../views/dialogPromt';
import QueryItems from './queryItems';


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
    const locationArr = window.document.location.pathname.split('/');
    const locationEnd = locationArr[locationArr.length - 1];
    const url_id = (props.withUrl && locationEnd !== props.name) ? locationEnd : 'new';

    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const [deleteMutation] = useMutation(props.query_delete);
    const [updateMutation] = useMutation(props.query_update);
    const [editDialog, setEditDialog] = React.useState(false);
    const [createDialog, setCreateDialog] = React.useState(false);
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState({ id: url_id });


    const handleAddButton = () => {
        if (props.actionType === 'create') {
            setCreateDialog(true);
        } else {
            handleCreate({ target: { value: { id: 'new' } } })
        }
    }
    const handleEditDialogOpen = (item) => {
        if (item.id !== 'new') {
            if (props.withUrl !== true) {
                setCurrentItem(item);
                setEditDialog(true);
            } else {
                history.push(`/${props.name}/${item.id}`);
            }
        }
    };
    const handleDeleteDialogOpen = (item) => {
        if (item.id !== 'new') {
            setCurrentItem(item);
            setDeleteDialog(true);
        }
    };

    const handleEditDialogClose = () => {
        if (props.withUrl === true) {
            history.push(`/${props.name}`);
        } else {
            setEditDialog(false);
        }
    };

    const handleDelete = () => {
        //const ids = props.query_variables.ids.filter(i => i !== currentItem.id);
        console.log('delete mutation');
        const deleteName = props.query_delete.definitions[0].name.value;
        const itemName = deleteName.replace('delete', '');

        const optimicticItem = Object.fromEntries(new Map([
            [deleteName, { __typename: itemName, id: currentItem.id }],
            ['__typename', 'Mutation'],
        ]));
        deleteMutation({
            variables: { id: currentItem.id },
            optimisticResponse: optimicticItem,
            update: (store, ans) => {
                const data = store.readQuery({ query: props.query_where, variables: props.query_variables });
                const dataItemsName = Object.keys(data)[0];
                const filtered_data = data.Rooms.filter(item => item.id !== currentItem.id);
                const new_data = Object.fromEntries(
                    new Map([
                        [dataItemsName, filtered_data],
                    ])
                );
                store.writeQuery({
                    query: props.query_where,
                    variables: props.query_variables,
                    data: new_data
                })
            },
            //refetchQueries: props.withUrl ? [{ query: props.query_where, variables: props.query_variables }] : []
        }).then(res => {
            //if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
        if (deleteDialog === true) setDeleteDialog(false);
    }
    const handleCreate = (e) => {

        //let ids = props.query_variables.ids;
        console.log('create mutation');
        const updateName = props.query_update.definitions[0].name.value;
        //const itemName = updateName.replace('update', '');
        //const today = new Date().toISOString().slice(0, 10);

        console.log(props.query_update);

        /*const optimicticItem = Object.fromEntries(new Map([
            [updateName, {
                ...e.target.value,
                __typename: itemName,
                updatedAt: today,
                createdAt: today
            }],
            ['__typename', 'Mutation'],
        ]));
        */

        updateMutation({
            variables: e.target.value,
            //optimisticResponse: optimicticItem,
            update: (store, ans) => {
                const data = store.readQuery({ query: props.query_where, variables: props.query_variables });
                const dataItemsName = Object.keys(data)[0];
                const new_data = Object.fromEntries(
                    new Map([
                        [dataItemsName, [...data[dataItemsName], ans.data[updateName]]],
                    ])
                );
                store.writeQuery({
                    query: props.query_where,
                    variables: props.query_variables,
                    data: { ...data, ...new_data }
                });
                let ids = props.query_variables.ids;
                ids = ids.concat(ans.data[updateName].id);
                if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });

            }
            //update: (proxy,s { data }) => {
            //    const key = Object.keys(data)[0];
            //    const newItem = data[key];
            //    ids = ids.concat(newItem.id);
            //},
            //,refetchQueries: props.withUrl ? [{ query: props.query_where, variables: props.query_variables }] : []
        }).then(res => {
        });

        if (createDialog === true) setCreateDialog(false);
    }
    const handleUpdate = (e) => {
        const updateName = props.query_update.definitions[0].name.value;
        const optimicticItem = Object.fromEntries(new Map([
            [updateName, {
                ...e.target.value,
                __typename: "Room",
            }],
            ['__typename', 'Mutation'],
        ]));
        updateMutation({
            variables: e.target.value,
            optimisticResponse: optimicticItem
        });
    }
    React.useEffect(() => {
        if (props.withUrl) {
            if (url_id !== 'new') {
                setCurrentItem({ id: url_id });
                setEditDialog(true);
            } else {
                setEditDialog(false);
            }
        }
    }, [props.withUrl, url_id]);

    return <Grid container spacing={2} justify="center" alignItems="center">
        {props.name.toString()}
        {props.query_variables.ids.toString()}
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

        {props.addButtonType === 'inline' ?
            <Grid item xs={12} sm={12} md={12} >
                {
                    props.CreateForm({
                        addButtonName: props.addButtonName,
                        item: { id: 'new' },
                        afterSubmit: handleCreate
                    })
                }
            </Grid>
            :
            <DialogFullScreen
                isNew={true}
                open={createDialog}
                onClose={() => { setCreateDialog(false) }}
                dialogName={props.dialogName}
                content={
                    props.CreateForm({
                        addButtonName: props.addButtonName,
                        item: { id: 'new' },
                        afterSubmit: handleCreate
                    })}
            />

        }
        <DialogPromt
            open={deleteDialog}
            onClose={() => { setDeleteDialog(false) }}
            dialogName={`${theme.props.components.Delete}?`}
            onYes={handleDelete}
            yes={theme.props.components.Yes}
            no={theme.props.components.No}
        />

        <QueryItems {...props} >
            {
                props => {

                    let items = props.items;
                    let item = currentItem;
                    if (item !== 'new') {
                        item = items.find(item => item.id === currentItem.id)
                        if (!item) {
                            item = { id: 'new' };
                        }
                    }

                    return <React.Fragment>

                        <DialogFullScreen
                            isNew={false}
                            open={editDialog}
                            onClose={handleEditDialogClose}
                            dialogName={props.dialogName}
                            content={
                                props.EditForm({
                                    item: item,
                                    afterSubmit: handleUpdate
                                })
                            }
                        />

                        <Grid item xs={12} sm={12} md={12} >
                            <ViewItems
                                name={props.name}
                                viewType={props.viewType}
                                items={items}
                                headers={props.headers}
                                superTableOptions={props.superTableOptions}
                                editButton={props.editButton}
                                deleteButton={props.deleteButton}
                                elementContent={props.elementContent}
                                cardActions={props.cardActions}
                                cardCollapse={props.cardCollapse}
                                editButtonName={props.editButtonName}
                                deleteButtonName={props.deleteButtonName}
                                handleEditDialogOpen={handleEditDialogOpen}
                                handleDeleteDialogOpen={handleDeleteDialogOpen}
                            />
                        </Grid>
                    </React.Fragment>
                }
            }
        </QueryItems>
    </Grid>
}
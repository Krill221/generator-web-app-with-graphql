
/*
    Example:

import CreateMany from '../../components/hasMany/createMany';

<CreateMany
                        name={models}
                        viewType='supertable' // can be grid list table supertable raw
                        superTableOptions={superTableOptions}
                        query_where={GETS}
                        query_variables={{ ids: [] }}
                        query_update={UPDATE}
                        query_delete={DELETE}
                        onChange={e => { props.handleChange(e); props.submitForm(); }}
                        withUrl={false} // use url
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
import { useMutation } from '@apollo/react-hooks';
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
    const pathname = window.document.location.pathname;
    const parent_url = '/' + pathname.split('/')[1];

    const theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openCreate, setOpenCreate] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState({ id: 'new' });


    const handleAddButton = () => {
        if (props.actionType === 'create') {
            setCurrentItem({ id: 'new' });
            handleCreateDialogOpen();
        } else {
            handleCreate({ target: { value: { id: 'new' } } })
        }
    }
    const handleEditDialogOpen = (item) => {
        if (props.withUrl !== true) {
            setCurrentItem(item);
            setOpenEdit(true);
        } else {
            history.push(`/${props.name}/${item.id}`);
        }
    };
    const handleEditDialogClose = () => {
        if (props.withUrl === true) history.push(parent_url);
        setOpenEdit(false);
    };
    const handleDeleteDialogOpen = (id) => {
        setCurrentItem(id); setDeleteDialog(true);
    };
    const handleDeleteDialogClose = () => {
        setDeleteDialog(false);
    };
    const handleCreateDialogOpen = () => { setOpenCreate(true); };
    const handleCreateDialogClose = () => { setOpenCreate(false); };
    const handleDelete = () => {
        const ids = props.query_variables.ids.filter(i => i !== currentItem.id);
        deleteMutation({
            variables: { id: currentItem.id },
            update: (proxy) => {
                /*try {
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
                */
            },
            refetchQueries: props.withUrl ? [{ query: props.query_where, variables: props.query_variables }] : []
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
        setDeleteDialog(false);
    }
    const handleUpdate = (e) => {
        //const ids = props.query_variables.ids.concat(e.target.value.id).filter((el, i, a) => i === a.indexOf(el));
        updateMutation({
            variables: e.target.value
        }).then(res => {
            //if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
        });
    }
    const handleCreate = (e) => {
        let ids = props.query_variables.ids; //.concat(e.target.value.id).filter((el, i, a) => i === a.indexOf(el));
        updateMutation({
            variables: e.target.value,
            update: (proxy, { data }) => {
                //const vars = {ids: ids};
                const key = Object.keys(data)[0];
                const newItem = data[key];
                //const items = proxy.readQuery({ query: props.query_where, variables: vars });
                //const key2 = Object.keys(items)[0];
                //items[key2].unshift(newItem);
                //proxy.writeQuery({ query: props.query_where, variables: vars, data: items });
                ids = ids.concat(newItem.id);
                //if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: ids } });
            },
            refetchQueries: props.withUrl ? [{ query: props.query_where, variables: props.query_variables }] : []
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
                    setCurrentItem({ id: id });
                    setOpenEdit(true);
                } else {
                    setOpenEdit(false);
                    setOpenCreate(false);
                }
            }
        }
    }, [props.withUrl, pathname, props.name, setCurrentItem]);

    const [deleteMutation] = useMutation(props.query_delete);
    const [updateMutation] = useMutation(props.query_update);



    return <Grid container spacing={2} justify="center" alignItems="center">
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

                        {props.addButtonType === 'inline' ?
                            <Grid item xs={12} sm={12} md={12} >
                                {
                                    props.CreateForm({
                                        addButtonName: props.addButtonName,
                                        item: item,
                                        afterSubmit: handleCreate
                                    })
                                }
                            </Grid>
                            :
                            <DialogFullScreen
                                isNew={true}
                                open={openCreate}
                                onClose={handleCreateDialogClose}
                                dialogName={props.dialogName}
                                content={
                                    props.CreateForm({
                                        addButtonName: props.addButtonName,
                                        item: item,
                                        afterSubmit: handleCreate
                                    })}
                            />

                        }

                        <DialogFullScreen
                            isNew={false}
                            open={openEdit}
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
        <DialogPromt
            open={deleteDialog}
            onClose={handleDeleteDialogClose}
            dialogName={`${theme.props.components.Delete}?`}
            onYes={handleDelete}
            yes={theme.props.components.Yes}
            no={theme.props.components.No}
        />
    </Grid>

}
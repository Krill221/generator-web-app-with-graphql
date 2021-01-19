/*
    Example:

                <PickOne
                    name={'comments'}
                    viewType='supertable' // can be grid list table
                    query_where={GETS_WHERE}
                    query_variables={{ ids: props.values.comments }}
                    query_from={GETS}
                    value={props.values.comments}
                    headers={headers}
                    superTableOptions={superTableOptions}
                    onChange={e => { props.handleChange(e); props.submitForm(); }}
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

                    }}
                    cardActions={(item, index) => null}
                    cardCollapse={(item, index) => null}
                    addButtonType='button' // can be fab button none
                    addButtonName={`${theme.props.components.Choose} Comment`}
                    editButtonName={theme.props.components.Choose}
                    deleteButtonName={theme.props.components.Delete}
                    deleteButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                />

 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid, Button, Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogFullScreen from '../views/dialogFullScreen';
import QueryItems2 from './queryItems2';
import QueryItems from '../views/viewItems';

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


export default function PickMany(props) {

    const classes = useStyles();

    const [openPick, setOpenPick] = React.useState(false);
    const handlePickDialogOpen = () => {
        const value = [];
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        setOpenPick(true);
    };
    const handlePickDialogClose = () => { setOpenPick(false); };

    const handlePick = (e) => {
        const value = props.value.concat(e.target.value);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        handlePickDialogClose();
    }

    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);


    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} >
                    <QueryItems
                        name={props.name}
                        viewType={props.viewType}
                        items={items}
                        headers={props.headers}
                        superTableOptions={props.superTableOptions}
                        editButton={(item, i) => 'each'}
                        deleteButton={(item, i) => 'none'}
                        elementContent={props.elementContent}
                        cardActions={props.cardActions}
                        cardCollapse={props.cardCollapse}
                        editButtonName={props.editButtonName}
                        deleteButtonName={props.deleteButtonName}
                        handleEditDialogOpen={handlePickDialogOpen}
                        handleDeleteDialogOpen={()=>{}}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    {props.addButtonType === 'fab' && <Fab
                        color="secondary"
                        variant='extended'
                        aria-label="add"
                        className={classes.fab}
                        onClick={handlePickDialogOpen}
                    ><AddIcon />{props.addButtonName !== undefined && props.addButtonName}</Fab>
                    }
                    {props.addButtonType === 'button' && <Grid item xs={12} sm={12} md={12} >
                        <Button
                            color="default"
                            className={`add-${props.name}`}
                            fullWidth
                            variant="outlined"
                            onClick={handlePickDialogOpen}
                        >
                            {props.addButtonName !== undefined ? props.addButtonName : 'add'}
                        </Button>
                    </Grid>
                    }
                </Grid>
            </Grid>
            <DialogFullScreen
                isNew={true}
                open={openPick}
                onClose={handlePickDialogClose}
                dialogName={props.dialogName}
                content={
                    <QueryItems2
                        viewType={props.viewType}
                        query_where={props.query_from}
                        query_variables={props.query_from_variables}
                        headers={props.headers}
                        superTableOptions={props.superTableOptions}
                        editButton={props.editButton}
                        deleteButton={props.deleteButton}
                        cardActions={props.cardActions}
                        cardCollapse={props.cardCollapse}
                        editButtonName={props.editButtonName}
                        deleteButtonName={props.deleteButtonName}
                        id='item-choose'
                        value={props.value}
                        hidden={i => !props.value.includes(i.id)}
                        onChange={handlePick}
                        elementContent={props.elementContent}
                    />
                }
            />
        </React.Fragment>
    );
}
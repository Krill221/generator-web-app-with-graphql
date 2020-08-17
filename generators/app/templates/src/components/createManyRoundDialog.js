/*
    Example:

    <CreateManyRoundDialog
                actionType='create' // 'create' or 'create-default'
                name='rooms'
                query_where={GET_HOTELS}
                query_update={UPDATE_HOTEL}
                EditForm={EditHotel}
                avatar_icon={(item, index) => <Avatar alt="" src={item.logo} className={classes.large} />}
                addButtonName="Добавить отель"
                deleteButton='each' // can be 'each', 'last', 'none'
                editButton='each' // can be 'each', 'last', 'none'
                onChange={(e) => setCurrentHotelId(e.target.value)}
    />

 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Typography,
    Container, Avatar,
    Dialog, AppBar, Toolbar, IconButton, Fab, Box, CircularProgress, TableContainer, Table, TableRow, TableCell, TableBody
} from '@material-ui/core';
import QueryItems from './queryItems';
import FolderIcon from '@material-ui/icons/Folder';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    fab: {
        //position: 'fixed',
        //bottom: theme.spacing(9),
        //right: theme.spacing(3),
        //zIndex: 1000,
    },
    cell: {
        border: 0,
        paddingRight: theme.spacing(2),
    },
    large: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        backgroundColor: 'white'
    }
}));

export default function СreateManyRoundDialog(props) {

    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleEditDialogClose = () => { setOpenEdit(false); };
    const classes = useStyles();

    const handleSelect = (id) => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: id } });
    }

    const handleChange = (e) => {
        if (currentId === 'new') {
            const value = props.value.concat(e.target.value);
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        }
    }
    const [updateMutation] = useMutation(props.query_update);

    return (<React.Fragment>
        <TableContainer>
            <Table size="small">
                <TableBody>
                    <TableRow>
                        <TableCell align="center" className={classes.cell}>
                            {
                                (props.actionType === 'create-default') &&
                                <Fab aria-label="add" className={classes.fab}
                                    onClick={() => updateMutation({ variables: { id: 'new' } }).then(res => {
                                        const value = props.value.concat([res.data[Object.keys(res.data)[0]]]);
                                        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
                                    })} >
                                    <AddIcon />
                                </Fab>
                            }
                            {
                                (props.actionType === 'create') &&
                                <Fab aria-label="add" className={classes.fab}
                                    onClick={() => { setCurrentId('new'); handleEditDialogOpen(); }}
                                >
                                    <AddIcon />
                                </Fab>
                            }
                        </TableCell>
                        <QueryItems name={props.name}
                            query_where={props.query_where}
                            query_variables={{ ids: props.value }}
                            hidden={props.hidden}
                            onCompleted={(data) => {
                                let items = data[Object.keys(data)[0]];
                                if (currentId === 'new') {
                                    let first_item = items[0];
                                    setCurrentId(first_item.id);
                                    handleSelect(first_item.id);
                                }
                            }}
                            renderItem={(item, index) =>
                                <TableCell key={index} className={classes.cell} align="center"
                                    onClick={() => {
                                        if ((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) {
                                            if (currentId !== item.id) {
                                                setCurrentId(item.id);
                                                handleSelect(item.id);
                                            } else {
                                                setCurrentId(item.id);
                                                handleEditDialogOpen();
                                            }
                                        }
                                    }}
                                >
                                    {props.avatar_icon &&
                                        <Box position="relative" display="inline-flex">
                                            <CircularProgress size={68} variant="static" value={currentId === item.id ? 100 : 0} />
                                            <Box
                                                top={0}
                                                left={0}
                                                bottom={0}
                                                right={0}
                                                position="absolute"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Avatar className={classes.large}>
                                                    {props.avatar_icon ? props.avatar_icon(item, index) : <FolderIcon />}
                                                </Avatar>
                                            </Box>
                                        </Box>
                                    }
                                </TableCell>
                            }
                        />
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" className={classes.cell}>
                            {props.addButtonName !== undefined && props.addButtonName}
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
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
                        props.EditForm({ ...props, itemId: currentId, onChange: handleChange, onSave: handleEditDialogClose, onDelete: handleEditDialogClose })
                    }
                </Container>
            </Dialog>
        }
    </React.Fragment >
    );
}
/*
    Example:
    
 */
import React from 'react';
import {
    TableRow, Card, CardActions, TableContainer, Table, TableBody,
    Button,
    TableCell,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    pointer: {
        cursor: 'pointer'
    },
    swipeItems: {
        padding: '5px'
    },
    media: {
        height: 100,
        minWidth: 120
    },
}));


export default function SwipeItems(props) {
    const classes = useStyles();

    return <TableContainer>
        <Table name={`${props.name}-list`} aria-label="table" size="small">
            <TableBody>
                <TableRow>
                    {props.items && props.items.map((item, index) => {
                        const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
                        const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

                        return <TableCell key={index} className={classes.swipeItems}>
                            <Card variant="outlined"
                                className={editable ? classes.pointer : ''}
                            >
                                <div onClick={() => { if (editable) props.handleEditDialogOpen(item) }}  >
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
                                            onClick={() => props.handleDeleteDialogOpen(item)}
                                        >
                                            {props.deleteButtonName}
                                        </Button>
                                    }
                                </CardActions>
                                <React.Fragment>
                                    {props.cardCollapse && props.cardCollapse(item, index)}
                                </React.Fragment>
                            </Card>
                        </TableCell>;
                    })
                    }
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}
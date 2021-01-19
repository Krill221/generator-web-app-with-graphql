/*
    Example:
    
 */
import React from 'react';
import {
    Grid, Card, CardActions,
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    pointer: {
        cursor: 'pointer'
    },
}));


export default function GridItems(props) {
    const classes = useStyles();

    return <Grid name={`${props.name}-list`} container spacing={3} justify="center" alignItems="center">
        {props.items && props.items.map((item, index) => {
            const editable = ((props.editButton(item, index) === 'each') || (props.editButton(item, index) === 'last' && (index === 0)) || (props.editButton(item, index) === true));
            const deletable = ((props.deleteButton(item, index) === 'each') || (props.deleteButton(item, index) === 'last' && (index === 0)) || (props.deleteButton(item, index) === true));

            return <Grid key={index} item xs={12} sm={6} md={4} >

                <Card variant="outlined"
                    className={editable ? classes.pointer : ''}
                >
                    <div
                        onClick={() => { if (editable) props.handleEditDialogOpen(item) }}
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
            </Grid>;
            })
        }
    </Grid>
}
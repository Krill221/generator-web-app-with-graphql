/*
    Example:

    <CreateManyGridDialog
    actionType='create' // 'create' or 'create-default'
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
    />}
    cardMedia={(item, index) => item.avatar}
    cardContent={(item, index) => <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
        <Typography variant="body2" component="p">{item.comments.length} comments</Typography>
    </CardContent>
    cardActions={(item, index) =>
        <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
    }
    dialogName="Comment"
    addButtonName="Add Comment"
    deleteButton='each' // can be 'each', 'last', 'none'
    editButton='last' // can be 'each', 'last', 'none'
    />

 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
    Container, Grid, Card, CardMedia, CardActions,
    Dialog, Button, AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import QueryGrid from './queryGrid';


export default function CreateManyGridDialog(props) {

    const [openEdit, setOpenEdit] = React.useState(false);
    const [currentId, setCurrentId] = React.useState('new');
    const handleEditDialogOpen = () => { setOpenEdit(true); };
    const handleEditDialogClose = () => { setOpenEdit(false); };

    const handleDelete = (id) => {
        const value = props.value.filter(i => i !== id);
        deleteMutation({
            variables: { id: id },
            refetchQueries: [{ query: props.query_where, variables: { ids: props.value } }]
        }).then(res => {
            if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        });
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
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
                            {props.cardHeader ? props.cardHeader(item, index) : ''}
                            <CardMedia
                                component="img"
                                alt=""
                                height="140"
                                image={props.cardMedia ? props.cardMedia(item, index) : ''}
                                title=""
                            />
                            {props.cardContent ? props.cardContent(item, index) : ''}
                            <CardActions>
                                {props.cardActions ? props.cardActions(item, index) : ''}
                                {((props.editButton === 'each') || (props.editButton === 'last' && (index === 0))) &&
                                    <Button aria-label="edit" color="primary" size="small" className={`edit-${props.name}`} onClick={() => { setCurrentId(item.id); handleEditDialogOpen(); }} >edit</Button>
                                }
                                {(props.deleteButton === 'each') &&
                                    <Button aria-label="delete" color="secondary" size="small" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >delete</Button>
                                }
                                {(props.deleteButton === 'last' && (index === 0)) &&
                                    <Button aria-label="delete" color="secondary" size="small" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >delete</Button>

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
                    {(props.actionType === 'create') &&
                        <Button className={`add-${props.name}`} onClick={() => { setCurrentId('new'); handleEditDialogOpen(); }} fullWidth variant="contained" >{props.addButtonName !== undefined ? props.addButtonName : 'add'}</Button>
                    }
                </Grid>
            </Grid>
            {(props.actionType === 'create') &&
                <Dialog fullScreen open={openEdit} onClose={handleEditDialogClose}>
                    <AppBar position="static">
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
                        <props.EditForm itemId={currentId} onChange={handleChange} onSave={handleEditDialogClose} onDelete={handleEditDialogClose} />
                    </Container>
                </Dialog>
            }
        </React.Fragment>
    );
}
/*
    Example:

    <PickManyListDialog
        name='posts'
        query_where={GET_POSTS_WHERE}
        query_from={GET_POSTS}
        query_from_variables={}
        value={props.values.posts}
        onChange={e => { props.handleChange(e); if (props.values.id !== 'new') { setSave(false); props.submitForm(); } }}
        avatar_icon={(item,index) => <FolderIcon />}
        primary_content={(item,index) => item.name}
        secondary_content={(item,index) => item.desc}
        pick_card_title='name'
        pick_card_subheader='name'
        pick_card_img='img'
        pick_card_button_name='add'
        dialogName="Comment"
        addButtonName="Add Comment"
        deleteButton='each' // can be 'each', 'last', 'none'
    />

 */
import React from 'react';
import {
    Grid, Container, ListItem, ListItemText, ListItemSecondaryAction,
    IconButton, ListItemAvatar, Avatar,
    Dialog, Button, AppBar, Toolbar, Typography
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PickOneGrid from './pickOneGrid';
import QueryList from './queryList';


export default function PickManyListDialog(props) {

    const [openPick, setOpenPick] = React.useState(false);
    const handlePickDialogOpen = () => { setOpenPick(true); };
    const handlePickDialogClose = () => { setOpenPick(false); };

    const handleDelete = (id) => {
        const value = props.value.filter(i => i !== id);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });

    }

    const handlePick = (e) => {
        const value = props.value.concat(e.target.value);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        handlePickDialogClose();
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} >
                    <QueryList name={props.name}
                        query={props.query_where}
                        query_variables={{ ids: props.value }}
                        renderItem={(item, index) => <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>{props.avatar_icon ? props.avatar_icon(item, index) : <FolderIcon />}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={props.primary_content ? props.primary_content(item, index) : ''} secondary={props.secondary_content ? props.secondary_content(item, index) : ''} />
                            <ListItemSecondaryAction>
                                {(props.deleteButton === 'each') &&
                                    <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                {(props.deleteButton === 'last' && (index === 0)) &&
                                    <IconButton edge="end" aria-label="delete" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                        }
                    /></Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Button className={`add-${props.name}`} onClick={handlePickDialogOpen} fullWidth variant="contained" >{props.addButtonName ? props.addButtonName : 'pick'}</Button>
                </Grid>
            </Grid>
            <Dialog fullScreen open={openPick} onClose={handlePickDialogClose}>
                <AppBar position="sticky">
                    <Toolbar>
                        <IconButton edge="start" aria-label="back" color="inherit" onClick={handlePickDialogClose}>
                            <ArrowBack />
                            {
                                props.dialogName &&
                                <Typography noWrap variant="h6">{props.dialogName}</Typography>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container>
                    <br />
                    <PickOneGrid
                        query={props.query_from}
                        query_variables={props.query_from_variables}
                        id='item-choose'
                        value={props.value}
                        hidden={i => !props.value.includes(i.id)}
                        onChange={handlePick}
                        title={props.pick_card_title}
                        subheader={props.pick_card_subheader}
                        img={props.pick_card_img}
                        button_name={props.pick_card_button_name}
                    />
                </Container>
            </Dialog>
        </React.Fragment>
    );
}
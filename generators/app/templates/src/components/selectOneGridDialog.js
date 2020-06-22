/*
    Example:

    <SelectOneGridDialog
        id='post'
        name='post'
        query={GET_POSTS}
        query_variables={}
        value={props.values.post}
        onChange={props.handleChange}
    />
    
*/
import React from 'react';
import {
    IconButton, Toolbar,
    Dialog, AppBar, 
    Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SelectOneGrid from './selectOneGrid';



export default function SelectOneGridDialog(props) {

    const [open, setOpen] = React.useState(false);
    const handleClickDialogOpen = () => { setOpen(true); };
    const handleDialogClose = () => { setOpen(false); };

    return (
        <React.Fragment>
            <Button className={`change-${props.name}`} size="small" color="primary" onClick={handleClickDialogOpen} >Change</Button>
            <Dialog fullScreen open={open} onClose={handleDialogClose}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SelectOneGrid
                    query={props.query}
                    query_variables={props.query_variables}
                    id={props.id}
                    value={props.value}
                    onChange={(e) => {
                        if(props.value !== '') handleDialogClose();
                        if(props.onChange !== undefined ) props.onChange(e);
                    }}
                    title='name'
                    subheader='name'
                    img='img'
                />
            </Dialog>
        </React.Fragment>
    );
}
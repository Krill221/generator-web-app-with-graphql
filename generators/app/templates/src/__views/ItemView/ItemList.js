import React, { Fragment } from 'react';
import {
    Divider,
    ListItem,
    ListItemSecondaryAction,
    ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DialogPromt from '../DialogView/DialogPromt';
import DialogFullScreen from '../DialogView/DialogFullScreen';


const ItemView = ({
    item,
    isNew,
    editContent,
    inlineContent,
    inlineContent2,
    deleteContent,
    activeEdit, setActiveEdit,
    activeDel, setActiveDel,
    options
}) => {

    return <Fragment>
        <ListItem>
            {inlineContent}
            {inlineContent2}
            {
                options.editable &&
                <ListItemIcon>
                    <IconButton
                        disabled={isNew}
                        color="primary"
                        name={'edit-item'}
                        edge="end"
                        aria-label="delete"
                        onClick={e => {
                            e.preventDefault();
                            setActiveEdit(true);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <DialogFullScreen
                        isNew={false}
                        isOpen={activeEdit}
                        setActive={setActiveEdit}
                    >
                        {editContent}
                    </DialogFullScreen>
                </ListItemIcon>
            }
            {
                options.deletable && <ListItemSecondaryAction>
                    <IconButton
                        disabled={isNew}
                        color="secondary"
                        name={'delete-item'}
                        edge="end"
                        aria-label="delete"
                        onClick={e => {
                            e.preventDefault();
                            setActiveDel(true);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <DialogPromt
                        isNew={true}
                        isOpen={activeDel}
                        onClose={() => { setActiveDel(false) }}
                    >
                        {deleteContent}
                    </DialogPromt>
                </ListItemSecondaryAction>
            }
        </ListItem>
        <Divider light />
    </Fragment>
};

export default ItemView;
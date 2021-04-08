import React, { Fragment } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DialogFullScreen from '../DialogView/DialogFullScreen';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    }
}));


const Create = ({ label, active, setActive, children }) => {

    const classes = useStyles();
    const theme = useTheme();


    return <Fragment>
        <Fab
            name={'add-item'}
            color="secondary"
            variant='extended'
            aria-label="add"
            className={classes.fab}
            onClick={() => setActive(true)}
        ><AddIcon />{label || theme.props.components.Add}</Fab>
        <DialogFullScreen
            label={label || theme.props.components.Add}
            isNew={true}
            isOpen={active}
            setActive={setActive}
        >
            {children}
        </DialogFullScreen>

    </Fragment>
};

export default Create;
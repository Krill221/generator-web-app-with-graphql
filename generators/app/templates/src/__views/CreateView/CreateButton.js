import React from 'react';
import { Grid, Button } from '@material-ui/core';
import DialogFullScreen from '../DialogView/DialogFullScreen';
import { useTheme } from '@material-ui/core/styles';


const Create = ({ label, active, setActive, children }) => {

    const theme = useTheme();

    return <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} >
            <Button
                name={'add-item'}
                color="default"
                variant='outlined'
                fullWidth
                aria-label={label || theme.props.components.Add}
                onClick={() => setActive(true)}
            >{label || theme.props.components.Add}</Button>
            <DialogFullScreen
                label={label || theme.props.components.Add}
                isNew={true}
                isOpen={active}
                setActive={setActive}
            >
                {children}
            </DialogFullScreen>
        </Grid>
    </Grid>
};

export default Create;
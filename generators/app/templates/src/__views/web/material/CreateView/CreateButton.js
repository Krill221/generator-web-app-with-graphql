import React from 'react';
import { Grid, Button } from '@material-ui/core';
import DialogFullScreen from '../helpers/DialogFullScreen';


const Create = ({ label = '', active, setActive, children }) => {

    return <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} >
            <Button
                name={'add-item'}
                color="default"
                variant='outlined'
                fullWidth
                aria-label={label}
                onClick={() => setActive(true)}
            >{label}</Button>
            <DialogFullScreen
                label={label}
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
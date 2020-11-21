/*
    Example:

    <ViewSet
        viewType='plan' // can be - tabs plan wizard raw or button
        labels={['1','2','3']}
        tabs={['1content','2content','3content']}
    />

 */

import React from 'react';
import {
    Stepper, Step, StepLabel, Button, ButtonGroup,
    Tabs, Tab, Grid, Container, Fab, Dialog, AppBar, Toolbar, IconButton
} from '@material-ui/core';
import TopAppBarSecond from '../topAppBarSecond';
import { makeStyles } from '@material-ui/core/styles';
import TopStick from '../topStick';
import ArrowBack from '@material-ui/icons/ArrowBack';


const useStyles = makeStyles((theme) => ({
    wizard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(9),
        right: theme.spacing(3),
        zIndex: 1000,
    },
}));



export default function ViewSet(props) {

    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => { setActiveStep( prevActiveStep => prevActiveStep + 1); };
    const handleBack = () => { setActiveStep( prevActiveStep => prevActiveStep - 1); };

    return <React.Fragment>
        {
            props.viewType === 'wizard' &&
            <TopAppBarSecond>
                <div className={classes.wizard}>

                    <Stepper activeStep={activeStep} alternativeLabel>
                        {props.labels.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button disabled={activeStep === 0} onClick={handleBack} >Назад</Button>
                        <Button disabled={activeStep === props.tabs.length - 1} color="primary" onClick={handleNext} id="next">След.</Button>
                    </ButtonGroup>
                </div>
            </TopAppBarSecond>
        }
        {
            props.viewType === 'tabs' &&
            <TopAppBarSecond>
                <Tabs
                    value={activeStep}
                    onChange={(_, tab) => setActiveStep(tab)}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {props.labels.map((label) => (
                        <Tab key={label} label={label} />
                    ))}
                </Tabs>
            </TopAppBarSecond>
        }
        {props.viewType === 'plan' && <React.Fragment>
            <TopStick>
                <Container>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={12} sm={12} md={12}></Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {props.labels.map(label => <div key={label}>{label}</div>)}
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}></Grid>
                    </Grid>
                </Container>
            </TopStick>
        </React.Fragment>
        }
        {props.viewType !== 'button' && props.tabs.map((step, index) => (activeStep === index) && <div key={index}>{step}</div>)}

        {props.viewType === 'button' && <React.Fragment>
            {
                (props.labels.length > 1) && (props.tabs.length > 1) && <React.Fragment>
                    {activeStep === 0 && props.tabs[0]}
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="add"
                        className={classes.fab}
                        onClick={() => setActiveStep(1)}
                    >
                        {props.labels[1]}
                    </Fab>
                    <Dialog fullScreen open={activeStep === 1}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setActiveStep(0)}>
                                    <ArrowBack />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        {activeStep === 1 && props.tabs[1]}
                    </Dialog>
                </React.Fragment>
            }
        </React.Fragment>
        }
    </React.Fragment>;
}
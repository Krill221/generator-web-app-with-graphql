/*
    Example:

    <ViewSet
        viewType='plan' // can be - tabs plan wizard raw
        labels={['1','2','3']}
        tabs={['1content','2content','3content']}
    />

 */

import React from 'react';
import {
    Stepper, Step, StepLabel, Button, ButtonGroup,
    Tabs, Tab, Grid, Container,
} from '@material-ui/core';
import TopAppBarSecond from '../bars/topAppBarSecond';
import { makeStyles } from '@material-ui/core/styles';
import TopStick from '../bars/topStick';


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

    const handleNext = () => { setActiveStep(prevActiveStep => prevActiveStep + 1); };
    const handleBack = () => { setActiveStep(prevActiveStep => prevActiveStep - 1); };

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
        {
            props.tabs.map((step, index) => (activeStep === index) && <div style={{ marginTop: '15px' }} key={index}>{step}</div>)
        }

    </React.Fragment>;
}
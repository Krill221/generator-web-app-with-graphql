/*
    Example:

    <ViewSet
        viewType='wizard' // can be - tabs tabsmain wisardmain plan wizard or raw
        labels={['1','2','3']}
        tabs={['1content','2content','3content']}
    />

 */

import React from 'react';
import {
    Stepper, Step, StepLabel, Button, ButtonGroup,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopStick from '../AppBarView/AppBarTopStick';


const useStyles = makeStyles((theme) => ({
    wizard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
}));



export default function LayoutView({labels, tabs}) {

    const classes = useStyles();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => { setActiveStep(prevActiveStep => prevActiveStep + 1); };
    const handleBack = () => { setActiveStep(prevActiveStep => prevActiveStep - 1); };

    return <React.Fragment>
        <TopStick>
            <div className={classes.wizard}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {labels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={activeStep === 0} onClick={handleBack} >Назад</Button>
                    <Button disabled={activeStep === tabs.length - 1} color="primary" onClick={handleNext} id="next">След.</Button>
                </ButtonGroup>
            </div>
        </TopStick>
        {
            tabs.map((step, index) => (activeStep === index) && <div style={{ marginTop: '15px' }} key={index}>{step}</div>)
        }

    </React.Fragment>;
}
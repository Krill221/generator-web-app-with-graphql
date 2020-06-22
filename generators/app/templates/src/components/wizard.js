/*
    Example:

    <Wizard labels={['Step 1', 'Step 2', 'Step 3']}
        steps={[<div>1</div>, <div>2</div>, <div>3</div>]}
        locationBack={`/`}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitName='Create'
    />

 */

import React from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';


export default function Wizard(props) {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => { setActiveStep((prevActiveStep) => prevActiveStep + 1); };
    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

    return (
        <Grid container spacing={3} direction="column" justify="center" alignItems="center">
            <Grid item xs={12}>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {props.labels.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Grid>
            <Grid item xs={12}>
                {
                    activeStep === 0 ?
                        <Button href={props.locationBack}>Close</Button>
                        :
                        <Button onClick={handleBack}  >Back</Button>
                }
                {
                    activeStep === props.steps.length - 1 ?
                        <Button className='create' onClick={props.handleSubmit} disabled={props.isSubmitting} variant="contained" color="primary">{props.submitName}</Button>
                        :
                        <Button variant="contained" color="primary" onClick={handleNext} id="next">Next</Button>
                }
            </Grid>
            <Grid item xs={12}>
                {props.steps.map((step, index) => (activeStep === index) && step )}
            </Grid>
        </Grid>
    );
}
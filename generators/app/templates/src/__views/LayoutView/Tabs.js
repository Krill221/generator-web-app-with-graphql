/*
    Example:

 */

import React from 'react';
import {
    Tabs, Tab
} from '@material-ui/core';
import TopStick from '../AppBarView/AppBarTopStick';

export default function LayoutView({labels, tabs}) {

    const [activeStep, setActiveStep] = React.useState(0);

    return <React.Fragment>
        <TopStick>
            <Tabs
                value={activeStep}
                onChange={(_, tab) => setActiveStep(tab)}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                {labels.map((label) => (
                    <Tab key={label} label={label} />
                ))}
            </Tabs>
        </TopStick>
        {
            tabs.map((step, index) => (activeStep === index) && <div style={{ marginTop: '15px' }} key={index}>{step}</div>)
        }

    </React.Fragment>;
}
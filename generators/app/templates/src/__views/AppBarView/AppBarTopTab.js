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
import { Tabs, Tab } from '@material-ui/core';
import TopAppBarSecond from './topAppBarSecond';



export default function Wizard(props) {

    const [tab, setTab] = React.useState(0);

    return <React.Fragment>
        <TopAppBarSecond>
            <Tabs
                value={tab}
                onChange={(_, tab) => setTab(tab)}
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
        {props.tabs.map((step, index) => (tab === index) && <div key={index}>{step}</div>)}
    </React.Fragment>;
}
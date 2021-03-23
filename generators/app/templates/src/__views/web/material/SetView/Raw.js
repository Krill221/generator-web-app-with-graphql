/*
    Example:

 */
import React from 'react';

export default function SetView({ labels, tabs }) {

    return <React.Fragment>
        <div>{labels[0]}</div>
        <div style={{ marginTop: '15px' }} >{tabs[0]}</div>
    </React.Fragment>;
}
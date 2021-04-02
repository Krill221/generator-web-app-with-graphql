/*
example:

<FieldText
    model={model}
    name={'email'}
    formikProps={props}
    onBlur={props.handleSubmit} // if create onBlur={props.onBlur}
    onChange={props.handleChange} // if create onChange={props.handleSubmit}
/>,

*/


import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const FieldText = ({ formikProps, name, model, onBlur, onChange, onKeyDown, InputProps, }) => {
    const theme = useTheme();

    return <TextField
        name={name}
        label={theme.props.models[model][name]}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={formikProps.values[name]}
        error={formikProps.errors[name] && formikProps.touched[name] ? true : false}
        helperText={formikProps.errors[name] && formikProps.touched[name] ? formikProps.errors[name] : null}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={onKeyDown}
        InputProps={InputProps}
    />
};

export default FieldText;
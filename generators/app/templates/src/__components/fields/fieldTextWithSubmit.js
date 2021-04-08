/*
example:

<FieldTextWithSubmit
    model={model}
    name={'email'}
    formikProps={props}
    onBlur={props.handleSubmit} // if create onBlur={props.onBlur}
    onChange={props.handleChange} // if create onChange={props.handleSubmit}
    onSubmit={props.handleSubmit}
/>,

*/


import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import { InputAdornment, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const FieldText = ({ formikProps, name, modelName, onBlur, onChange, onSubmit, onKeyDown, InputProps, }) => {
    const theme = useTheme();

    return <TextField
        name={name}
        label={theme.props.models[modelName][name]}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        value={formikProps.values[name]}
        error={formikProps.errors[name] && formikProps.touched[name] ? true : false}
        helperText={formikProps.errors[name] && formikProps.touched[name] ? formikProps.errors[name] : null}
        onBlur={onBlur}
        onChange={onChange}
        onKeyDown={e => {
            if(e.key === 'Enter') {
                e.preventDefault()
                onSubmit && onSubmit();
            }
        }}
        InputProps={{
            endAdornment: <InputAdornment position="end">
                <IconButton
                    edge="end"
                    name={`add-${modelName}`}
                    onClick={onSubmit}
                    aria-label="search"
                >
                    <SendIcon />
                </IconButton>
            </InputAdornment>,
        }}
    />
};

export default FieldText;
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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const FieldNumber = ({ formikProps, name, modelName, onBlur, onChange, onSubmit, onKeyDown, InputProps, }) => {
    const theme = useTheme();

    const onDec = (e) => {
        e.preventDefault()
        if (Number(formikProps.values[name]) > 1) {
            onChange({ target: { name: name, value: String(Number(formikProps.values[name]) - 1) } });
        }
        onBlur && onBlur();
        onSubmit && onSubmit();
    }

    const onInc = (e) => {
        e.preventDefault()
        if (Number(formikProps.values[name]) >= 1) {
            onChange({ target: { name: name, value: String(Number(formikProps.values[name]) + 1) } });
        }
        onBlur && onBlur();
        onSubmit && onSubmit();
    }

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
            if (e.key === 'Enter') {
                e.preventDefault()
                onSubmit && onSubmit();
            }
        }}
        InputProps={{
            endAdornment: <InputAdornment position="end">
                <IconButton
                    edge="end"
                    name={`inc-${modelName}`}
                    onClick={onInc}
                    aria-label="search"
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    edge="end"
                    name={`dec-${modelName}`}
                    onClick={onDec}
                    aria-label="search"
                >
                    <RemoveIcon />
                </IconButton>
            </InputAdornment>,
        }}
    />
};

export default FieldNumber;
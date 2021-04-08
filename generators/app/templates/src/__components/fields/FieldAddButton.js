/*
    Example:

 */
import React from 'react';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function FieldAddButton({modelName, label, onClick, color, variant, fullWidth}) {

    const theme = useTheme();

    return <Button
        name={`add-${modelName}`}
        onClick={onClick}
        color={color || 'default'}
        variant={variant || 'outlined'}
        fullWidth={fullWidth || true}
    >
        {label || theme.props.components.Add}
    </Button>
}
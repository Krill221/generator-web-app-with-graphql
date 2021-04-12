/*
    Example:
                
    <FieldButtonUpload
                    modelName={modelName}
                    name={'avatar'}
                    formikProps={props}
                    onChange={props.handleChange}
                    onBlur={props.handleSubmit}
                    uploadButton={(loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Upload File</Button>}
                    deleteButton={(loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Delete File</Button>}
    />
 */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DialogPromt from '../../__views/DialogView/DialogPromt';
import { UPLOAD_FILE, DELETE_FILE } from '../../queries/uploadFile';

export default function FieldButtonUpload({ formikProps, name, modelName, onChange, deleteButton, uploadButton, onBlur }) {

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };


    const [uploadFile, uploadStatus] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ uploadFile }) => {
            onChange({ target: { name: name, value: uploadFile.filename } });
            onBlur && onBlur();
        }
    });
    const handleUpload = ({ target: { validity, files: [file] } }) => {
        validity.valid && uploadFile({ variables: { file } })
    };

    const [deleteFile, deleteStatus] = useMutation(DELETE_FILE, {
        onCompleted: ({ uploadFile }) => {
            onChange({ target: { name: name, value: '' } });
            onBlur && onBlur();
        }
    });
    const handleDelete = () => {
        deleteFile({ variables: { file: formikProps.values[name] } });
        handleClose();
    };

    return <React.Fragment>
        <DialogPromt
            isNew={true}
            isOpen={open}
            onClose={handleClose}
        >
            <Button name={`delete-${name}`} color="primary" autoFocus onClick={handleDelete}>{theme.props.components.Yes}</Button>
            <Button onClick={handleClose} color="primary">{theme.props.components.No}</Button>
        </DialogPromt>

        {formikProps.errors[name] &&
            <Alert severity="error">{theme.props.models[modelName][name]} theme.props.components.NotUploaded</Alert>
        }
        <input onChange={handleUpload} accept="image/*" id={`upload-button-${name}`} name={`upload-button-${name}`} type="file" style={{ display: 'none' }} />
        {
            formikProps.values[name] && formikProps.values[name] !== '' ?
                <label onClick={handleClickOpen} style={{ display: 'block' }} htmlFor={`delete-button-${name}`}>{deleteButton(deleteStatus.loading)}</label>
                :
                <label style={{ display: 'block' }} htmlFor={`upload-button-${name}`}>{uploadButton(uploadStatus.loading)}</label>
        }
    </React.Fragment>
}
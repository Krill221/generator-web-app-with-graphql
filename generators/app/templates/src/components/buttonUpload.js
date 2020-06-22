/*
    Example:
        <ButtonUpload name="file" value={props.values.file} onChange={(e) => {props.handleChange(e); props.handleSubmit(e);}}
            uploadButton={ (loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Upload File</Button>}
            deleteButton={ (loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Delete File</Button>}
        / >
 */
import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
import { UPLOAD_FILE, DELETE_FILE } from '../queries/uploadFile';

export default function ButtonUpload(props) {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };


    const [uploadFile, uploadStatus] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ uploadFile }) => {
            props.onChange({ target: { name: props.name, value: uploadFile.filename } });
        }
    });
    const handleUpload = ({ target: { validity, files: [file] } }) => {
        validity.valid && uploadFile({ variables: { file } })
    };

    const [deleteFile, deleteStatus] = useMutation(DELETE_FILE, {
        onCompleted: ({ uploadFile }) => {
            props.onChange({ target: { name: props.name, value: '' } });
        }
    });
    const handleDelete = () => {
        deleteFile({ variables: { file: props.value } });
        handleClose();
    };

    return <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delele"
            aria-describedby="delete"
        >
            <DialogTitle id="alert-delele">{"Delete?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleDelete} color="primary" autoFocus>Yes</Button>
                <Button onClick={handleClose} color="primary">No</Button>
            </DialogActions>
        </Dialog>
        <input onChange={handleUpload} accept="image/*" id={`upload-button-${props.name}`} type="file" style={{ display: 'none' }} />
        {
            props.value ?
                <label onClick={handleClickOpen} style={{ display: 'block' }} htmlFor={`delete-button-${props.name}`}>{props.deleteButton(deleteStatus.loading)}</label>
                :
                <label style={{ display: 'block' }} htmlFor={`upload-button-${props.name}`}>{props.uploadButton(uploadStatus.loading)}</label>
        }
    </React.Fragment>
}
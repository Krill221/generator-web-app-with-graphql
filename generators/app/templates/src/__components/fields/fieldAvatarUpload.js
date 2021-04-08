/*
    Example:
                <FieldAvatarUpload
                    model={model}
                    name={'avatar'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,               
 */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DialogPromt from '../../__views/DialogView/DialogPromt';
import { UPLOAD_FILE, DELETE_FILE } from '../../queries/uploadFile';
import EditIcon from '@material-ui/icons/Edit';
//import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import { CircularProgress, Badge, Avatar } from '@material-ui/core';


const SmallFab = withStyles((theme) => ({
    root: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
    },
}))(Avatar);

const LargeAvatar = withStyles((theme) => ({
    root: {
        width: theme.spacing(18),
        height: theme.spacing(18),
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default function FieldButtonUpload({ formikProps, name, modelName, onChange, deleteButton, uploadButton, onBlur }) {

    const theme = useTheme();
    const classes = useStyles();

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
            onBlur();
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

                <div className={classes.root}>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            deleteStatus.loading ?
                                <CircularProgress />
                                :
                                <label onClick={handleClickOpen} style={{ display: 'block' }} htmlFor={`delete-button-${name}`}>
                                    <SmallFab
                                        name={'edit-icon'}
                                        color="primary"
                                        aria-label="add"
                                    ><EditIcon />
                                    </SmallFab>
                                </label>
                        }
                    >
                        <LargeAvatar alt={'avatar'} src={formikProps.values['avatar']} />
                    </Badge>
                </div>

                :

                <div className={classes.root}>
                    <Badge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={
                            uploadStatus.loading ?
                                <CircularProgress />
                                :
                                <label style={{ display: 'block' }} htmlFor={`upload-button-${name}`}>
                                    <SmallFab
                                        name={'edit-icon'}
                                        color="primary"
                                        aria-label="add"
                                    ><PublishIcon />
                                    </SmallFab>
                                </label>
                        }
                    >
                        <LargeAvatar alt={'avatar'} src={''} />
                    </Badge>
                </div>

        }
    </React.Fragment>
}
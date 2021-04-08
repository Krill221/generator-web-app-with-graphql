import React, { useContext, Fragment } from 'react';
import { AuthContext } from '../../__providers/authProvider';
import { useTheme, makeStyles } from '@material-ui/core/styles';
//import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Card, CardActions, CardContent } from '@material-ui/core';
import DialogPromt from '../DialogView/DialogPromt';
import DialogFullScreen from '../DialogView/DialogFullScreen';

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1)
    },
}));


const ItemView = ({
    isNew,
    item,
    editContent,
    inlineContent,
    deleteContent,
    activeEdit, setActiveEdit,
    activeDel, setActiveDel,
    options
}) => {
    const theme = useTheme();
    const classes = useStyles();

    const { user } = useContext(AuthContext);

    return <Box display="flex" flexDirection={user.id === item.userId?.id ? 'row-reverse' : 'row'} p={1} m={1} >
        {
            (user.id !== item.userId?.id) && <Avatar className={classes.details} alt="12" src={item.userId?.avatar} />
        }
        <Card variant="outlined" >
            <CardContent>
                {inlineContent}
            </CardContent>
            <CardActions>
                {
                    ((user.id === item.userId?.id) && options.editable) && <Fragment>
                        <Button
                            disabled={isNew}
                            color="primary"
                            name={'delete-item'}
                            aria-label="delete"
                            size="small"
                            onClick={e => {
                                e.preventDefault();
                                setActiveEdit(true);
                            }}
                        >
                            {theme.props.components.Edit}
                        </Button>
                        <DialogFullScreen
                            isNew={false}
                            isOpen={activeEdit}
                            setActive={setActiveEdit}
                        >
                            {editContent}
                        </DialogFullScreen>
                    </Fragment>
                }
                {
                    ((user.id === item.userId?.id) && options.deletable) && <Fragment>
                        <Button
                            disabled={isNew}
                            color="secondary"
                            name={'delete-item'}
                            aria-label="delete"
                            size="small"
                            onClick={e => {
                                e.preventDefault();
                                setActiveDel(true);
                            }}
                        >
                            {theme.props.components.Delete}
                        </Button>
                        <DialogPromt
                            isNew={true}
                            isOpen={activeDel}
                            onClose={() => { setActiveDel(false) }}
                        >
                            {deleteContent}
                        </DialogPromt>
                    </Fragment>
                }
            </CardActions>
        </Card>
    </Box >
};

export default ItemView;
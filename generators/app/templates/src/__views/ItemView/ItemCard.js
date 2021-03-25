import React, { Fragment } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button, Card, CardActions, CardContent } from '@material-ui/core';
import DialogPromt from '../DialogView/DialogPromt';
import DialogFullScreen from '../DialogView/DialogFullScreen';


const ItemView = ({
    isNew,
    editContent,
    inlineContent,
    deleteContent,
    activeEdit, setActiveEdit,
    activeDel, setActiveDel,
    options
}) => {
    const theme = useTheme();

    return <Card>
        <CardContent>
            {inlineContent}
        </CardContent>
        <CardActions>
            {
                options.editable && <Fragment>
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
                options.deletable && <Fragment>
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
};

export default ItemView;
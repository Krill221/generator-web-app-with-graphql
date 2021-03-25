import { useTheme } from '@material-ui/core/styles';
import DialogPromt from '../DialogView/DialogPromt';
import DialogFullScreen from '../DialogView/DialogFullScreen';
import { Fragment } from 'react';
import { Button } from '@material-ui/core';


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


    return <Fragment>
        {
            options.inline && <Fragment>
                {inlineContent}
            </Fragment>
        }
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
        </Fragment>
};

export default ItemView;
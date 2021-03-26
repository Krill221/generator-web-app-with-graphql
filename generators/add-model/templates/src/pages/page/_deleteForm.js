import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const model = '<%=small_model%>';

const Form = ({ item, isNew, del, setActive }) => {

    const theme = useTheme();

    return <Fragment>
        <Button
            name={`delete-${model}`}
            onClick={() => {
                del(item);
                setActive(false);
            }}
            color="primary"
            autoFocus>
            {theme.props.components.Yes}
        </Button>
        <Button
            onClick={() => setActive(false)}
            color="primary"
        >
            {theme.props.components.No}
        </Button>
    </Fragment >

};

export default Form;
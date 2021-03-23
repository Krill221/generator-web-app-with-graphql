import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikNew';
import FieldText from '../../__components/fieldText';
import validationSchema from './validationSchema';
import { Button } from '@material-ui/core';
import {
    //Chat as SetView,
    Grid12 as SetView,
    //Raw as SetView,
    //Simple as SetView,
    //Tabs as SetView,
    //Wizard as SetView,
} from '../../__views/web/material/SetView';

const models = 'users';

const Item = ({ item, add, setActive }) => {

    const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <SetView
            labels={['']}
            tabs={[
                <FieldText
                    models={models}
                    name={'username'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    models={models}
                    name={'email'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    models={models}
                    name={'password'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <Button
                    name={`add-${models}`}
                    onClick={props.handleSubmit}
                    color="default"
                    variant="outlined"
                    fullWidth
                >
                    {theme.props.components.Add}
                </Button>
            ]
            }
        />
        }
    </Form>
};

export default Item;
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikNew';
import FieldText from '../../__components/fieldText';
import {model, validationSchema} from './schema';
import { Button } from '@material-ui/core';
import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';


const Item = ({ item, add, setActive }) => {

    const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldText
                    model={model}
                    name={'username'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    model={model}
                    name={'email'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    model={model}
                    name={'password'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <Button
                    name={`add-${model}`}
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
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikNew';
import FieldText from '../../__components/fieldText';
import validationSchema from './validationSchema';
import { Button } from '@material-ui/core';
import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';

const model = '<%=small_model%>';

const Item = ({ item, add, setActive }) => {

    const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <% fields.forEach(function(field){ %><FieldText
                    model={model}
                    name={'<%= field[0] %>'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <% }) %>
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
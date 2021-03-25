import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikEdit';
import FieldText from '../../__components/fieldText';
import validationSchema from './validationSchema';
import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';

const models = 'users';

const Item = ({ item, isNew, update, setActive }) => {
    
    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldText
                    models={models}
                    name={'username'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <FieldText
                    models={models}
                    name={'email'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <FieldText
                    models={models}
                    name={'password'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
            ]
            }
        />
        }
    </Form>
};

export default Item;
import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikEdit';
import FieldText from '../../__components/fields/fieldText';
import FieldAvatarUpload from '../../__components/fields/fieldAvatarUpload';

import { model, validationSchema } from './schema';
import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';

const Item = ({ item, isNew, update, setActive }) => {

    //const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[

                <FieldAvatarUpload
                    model={model}
                    name={'avatar'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <FieldText
                    model={model}
                    name={'username'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <FieldText
                    model={model}
                    name={'email'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <FieldText
                    model={model}
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
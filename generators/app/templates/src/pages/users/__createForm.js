import React from 'react';
import FieldText from '../../__components/fields/fieldText';
import Form from '../../__components/FormikNew';
import FieldAvatarUpload from '../../__components/fields/fieldAvatarUpload';
import FieldAddButton from '../../__components/fields/FieldAddButton';
import { modelName, validationSchema } from './schema';
import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';


const Item = ({ item, add, setActive }) => {

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldAvatarUpload
                    modelName={modelName}
                    name={'avatar'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    modelName={modelName}
                    name={'username'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    modelName={modelName}
                    name={'email'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldText
                    modelName={modelName}
                    name={'password'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                />,
                <FieldAddButton
                    modelName={modelName}
                    onClick={props.handleSubmit}
                />
            ]
            }
        />
        }
    </Form>
};

export default Item;
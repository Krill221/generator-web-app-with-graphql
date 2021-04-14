import React from 'react';
import Form from '../../__components/helpers/FormikNew';
import FieldText from '../../__components/fields/FieldText';
import FieldAvatarUpload from '../../__components/fields/FieldAvatarUpload';
import FieldSubmitButton from '../../__components/fields/FieldSubmitButton';
import {
    modelName,
    validationSchema
} from '../users/schema';
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
                <FieldSubmitButton
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
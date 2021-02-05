import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
const model = 'user';

const FieldsSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Must be 2 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export default function Form({item, afterSubmit, children}) {

    item = item.id !== 'new' ? item : { id: 'new', username: '', email: '', password: '' }
    return <Formik
        initialValues={{
            id: item.id,
            username: item.username,
            email: item.email,
            password: '',
        }}
        enableReinitialize={true}
        validationSchema={FieldsSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            //actions.resetForm();
            const e = { target: { id: model, value: values } };
            afterSubmit(e);
        }}
    >
        {props => children({ ...props })}
    </Formik>;
}
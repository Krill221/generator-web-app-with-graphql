import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import {
    GET_USERS as GETS,
    GET_USER as GET,
    UPDATE_USER as UPDATE,
    DELETE_USER as DELETE
} from '../../queries/users';
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
        .max(50, 'Too Long!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export default function Form({query_where, query_variables, itemId, onChange, onDelete, afterSubmit, onSave, children, parentId}) {

    const { data, loading } = useQuery(GET, { variables: { id: itemId }, skip: itemId === 'new' });
    const [updateMutation] = useMutation(UPDATE, {
        onCompleted: (data) => {
            const value = data[Object.keys(data)[0]];
            if (onChange !== undefined) onChange({ target: { id: model, value: value } });
        }
    });
    const [deleteMutation] = useMutation(DELETE, {
        variables: { id: itemId },
        onCompleted: (data) => { if (onDelete !== undefined) onDelete(data) }
    });
    if (loading) return null;
    let item = data ? data[model] : { id: 'new', username: '', email: '', password : '', confirmPassword: ''  }
    return <Formik
        initialValues={{
            id: item.id,
            username: item.username,
            email: item.email,
            password: item.password,
            confirmPassword: '',
        }}
        enableReinitialize={true}
        validationSchema={FieldsSchema}
        onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            //actions.resetForm();
            updateMutation({ variables: values });
            (afterSubmit !== undefined) && afterSubmit();
        }}
    >
        {props => children({ ...props, handleDelete: deleteMutation })}
    </Formik>;
}
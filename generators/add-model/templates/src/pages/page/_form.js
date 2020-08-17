import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import {
    GET_<%=large_models%> as GETS,
    GET_<%=large_model%> as GET,
    UPDATE_<%=large_model%> as UPDATE,
    DELETE_<%=large_model%> as DELETE
} from '../../queries/<%=small_models%>';
const model = '<%=small_model%>';

const FieldsSchema = Yup.object().shape({
    <% fields.forEach(function(field){ if(field[1] === 'String') { %>
    <%= field[0] %>: Yup.string()
        .min(2, 'Must be 2 characters or more!')
        .max(150, 'Too Long!')
        .required('Required'),
    <% }}) %>
});

export default function Form({query_where, query_variables, itemId, onChange, onDelete, afterSubmit, onSave, children}) {

    const { data, loading } = useQuery(GET, { variables: { id: itemId }, skip: itemId === 'new' });
    const [updateMutation] = useMutation(UPDATE, {
        refetchQueries: [{ query: GETS }],
        onCompleted: (data) => {
            const value = data[Object.keys(data)[0]];
            if (onChange !== undefined) onChange({ target: { id: model, value: value } });
        }
    });

    const [deleteMutation] = useMutation(DELETE, {
        refetchQueries: [{ query: GETS }],
        variables: { id: itemId },
        onCompleted: (data) => { if (onDelete !== undefined) onDelete(data) }
    });

    if (loading) return null;
    let item = data ? data[model] : { id: 'new', <% fields.forEach(function(field){ %><%= field[0] %>: <%if(field[1] === 'String'){%>''<%}%><%if(field[1] === 'ID'){%>''<%}%><%if(field[1] === 'Boolean'){%>false<%}%>, <% }) %> }
    
    return <Formik
        initialValues={{ id: item.id, <%= fields.map(f => `${f[0]}: item.${f[0]}` ).join(', ') %>, }}
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
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
const model = '<%=small_model%>';

const FieldsSchema = Yup.object().shape({
    <% fields.forEach(function(f){ if(f[1] === 'String') { %>
    <%= f[0] %>: Yup.string()
        .min(2, 'Must be 2 characters or more!')
        .max(150, 'Too Long!')
        .required('Required'),
    <% }}) %>
});

export default function Form({item, afterSubmit, children}) {

    item = item.id !== 'new' ? item : { id: 'new', <% fields.forEach(function(field){ %><%= field[0] %>: <%if(field[1] === 'String'){%>''<%}%><%if(field[1] === 'ID'){%>''<%}%><%if(field[1] === 'Boolean'){%>false<%}%>, <% }) %> }
    
    // items gen

    return <Formik
        initialValues={item}
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
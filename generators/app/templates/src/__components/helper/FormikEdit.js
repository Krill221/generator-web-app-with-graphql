/*

example:

<Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
}}>
</Form>

*/



import React from 'react';
import { Formik } from 'formik';


export default function FormikEdit({ validationSchema, item, onSubmit, children }) {

    if ('password' in item) item = { ...item, ...{ password: '' } };

    return <Formik
        initialValues={item}
        enableReinitialize={false}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
            //actions.setSubmitting(true);
            onSubmit(values);
            //actions.setSubmitting(false);
        }}
    >
        {props => children({ ...props }) }
    </Formik>;
}
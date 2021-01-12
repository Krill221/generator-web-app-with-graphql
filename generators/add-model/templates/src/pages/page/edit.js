import React from 'react';
import ViewSet from '../../components/views/viewSet';
import Form from './_form';
import Fields1 from './_fields1'

export default function Edit({item, afterSubmit}) {
    return <Form item={item} afterSubmit={afterSubmit}>
        {props => <ViewSet
            viewType='plan'
            labels={['']}
            tabs={[
                <Fields1
                    item={props.item}
                    values={props.values}
                    errors={props.errors}
                    touched={props.touched}
                    handleChange={props.handleChange}
                    onDelete={props.onDelete}
                    submitForm={props.submitForm}
                />
            ]}
        />
        }
    </Form>
}
import React from 'react';
import ViewSet from '../../components/views/viewSet';
import Fields1 from './_fields1';
import Form from './_form';

export default function Edit(props) {

    const itemId = props.itemId;
    const [save, setSave] = React.useState(false);
    const afterSubmit = () => { (save && props.onSave !== undefined) && props.onSave(); }

    return <Form itemId={itemId} onSave={props.onSave} onChange={props.onChange} afterSubmit={afterSubmit} onDelete={props.onDelete}>
        {props => <ViewSet
            viewType='plan'
            labels={['Edit']}
            tabs={[
                <Fields1
                    item={props.item}
                    values={props.values}
                    errors={props.errors}
                    touched={props.touched}
                    onSave={props.onSave}
                    handleChange={props.handleChange}
                    handleBlur={props.handleChange}
                    afterSubmit={afterSubmit}
                    onDelete={props.onDelete}
                    setSave={setSave}
                    submitForm={props.submitForm}
                />
            ]}
        />
        }
    </Form>
}
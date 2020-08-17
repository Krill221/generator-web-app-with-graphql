import React from 'react';
import { Typography } from '@material-ui/core';
import ViewSet from '../../components/views/viewSet';
import CreateView1 from './_create_view_1';
import Form from './_form';



export default function Create(props) {

    const itemId = props.itemId;
    const [save, setSave] = React.useState(false);
    const afterSubmit = () => { (save && props.onSave !== undefined) && props.onSave(); }

    return <Form itemId={itemId} onSave={props.onSave} onChange={props.onChange} afterSubmit={afterSubmit} onDelete={props.onDelete}>
        {props => <ViewSet
            viewType='plan'
            labels={[<Typography variant="h5" gutterBottom>New</Typography>]}
            tabs={[
                <CreateView1
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
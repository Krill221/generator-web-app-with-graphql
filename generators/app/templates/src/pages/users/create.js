import React from 'react';
import { Typography, Container, Grid, Button } from '@material-ui/core';
import ViewSet from '../../components/views/viewSet';
import Fields1 from './_fields1';
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
                <React.Fragment>
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
                    <Container>
                        <Grid container spacing={2} justify="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={12} >
                                <Button
                                    className='save-button'
                                    fullWidth
                                    onClick={() => { setSave(true); props.submitForm(); }}
                                    disabled={props.isSubmitting}
                                    variant="contained"
                                    color="primary"
                                >Save</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
            ]}
        />
        }
    </Form>
}
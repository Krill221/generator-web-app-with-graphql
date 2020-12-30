import React from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import ViewSet from '../../components/views/viewSet';
import Fields1 from './_fields1';
import Form from './_form';

export default function Create({addButtonName, item, afterSubmit}) {
    return <Form item={item} afterSubmit={afterSubmit}>
        {props => {
            return <ViewSet
                viewType='raw'
                labels={['']}
                tabs={[
                    <React.Fragment>
                        <Fields1
                            item={props.item}
                            values={props.values}
                            errors={props.errors}
                            touched={props.touched}
                            handleChange={props.handleChange}
                            submitForm={() => {}}
                        />
                        <Container>
                            <Grid container spacing={2} justify="center" alignItems="center">
                                <Grid item xs={12} sm={12} md={12} >
                                    <Button
                                        className='save-button'
                                        fullWidth
                                        onClick={() => { props.submitForm(); }}
                                        disabled={props.isSubmitting}
                                        variant="contained"
                                        color="primary"
                                    >{addButtonName}</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                ]}
            />;
            }
        }
    </Form>
}
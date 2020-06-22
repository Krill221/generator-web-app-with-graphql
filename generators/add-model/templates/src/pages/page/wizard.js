import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, TextField, Grid } from '@material-ui/core';
import Wizard from '../../components/wizard';
import Form from './_form';
////g-key import components
////g-key import queries
////g-key import helpers

export default function SingleWizard(props) {

    let history = useHistory();
    const back = '/<%=small_models%>';
    const handleChange = () => history.push(back);

    return <Container>
        <Form itemId={'new'} onChange={handleChange}>
            {props =>
                <Wizard
                    locationBack={back}
                    handleSubmit={props.handleSubmit}
                    isSubmitting={props.isSubmitting}
                    submitName='create'
                    labels={['Step 1', 'Step 2', 'Step 3']}
                    steps={[
                        <div key={'step1'}></div>,
                        <div key={'step2'}></div>,
                        <Grid key={'step3'} container spacing={2} justify="center" alignItems="center">
                            <% fields.forEach(function(field){ %><Grid item xs={12} sm={12} md={12} >
                                <TextField
                                    id="<%= field[0] %>"
                                    name="<%= field[0] %>"
                                    label="<%= field[0] %>"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    value={props.values.<%= field[0] %>}
                                    error={props.errors.<%= field[0] %> && props.touched.<%= field[0] %> ? true : false}
                                    helperText={props.errors.<%= field[0] %> && props.touched.<%= field[0] %> ? props.errors.<%= field[0] %> : null}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                />
                            </Grid>
                            <% }) %>
                        </Grid>
                    ]}
                />
            }
        </Form>
    </Container>;
}
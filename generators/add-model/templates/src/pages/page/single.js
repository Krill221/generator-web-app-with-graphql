import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Button, TextField, Grid } from '@material-ui/core';
import Form from './_form';
////g-key import components
////g-key import queries
////g-key import helpers

export default function Single(props) {

    let history = useHistory();
    const itemId = props.match.params.itemId;
    const back = '/<%=small_models%>';

    const handleChange = () => history.push(back);
    const handleDelete = () => history.push(back);

    return <Container>
        <Form itemId={itemId} onChange={handleChange} onDelete={handleDelete}>
            {props =>
                <Grid container spacing={2} justify="center" alignItems="center">
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
                    <Grid item xs={12} sm={12} md={12} >
                        <input id='id' name="id" type='hidden' value={props.values.id} />
                        <Button className='save-button' fullWidth onClick={props.handleSubmit} disabled={props.isSubmitting} variant="contained" color="primary">save</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Button className='delete-button' fullWidth onClick={props.handleDelete} disabled={props.isSubmitting} variant="contained" color="secondary">delete</Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <Button className='back-button' fullWidth href={back} disabled={props.isSubmitting} variant="contained" color="primary" >back</Button>
                    </Grid>
                </Grid>
            }
        </Form>
    </Container>;
}
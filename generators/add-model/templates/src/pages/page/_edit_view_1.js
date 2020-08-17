
import React from 'react';
import { TextField, Grid, Container } from '@material-ui/core';

export default function EditView1(props) {
    return <Container>
        <Grid container spacing={2} justify="center" alignItems="center">
            <% fields.forEach(function(field){ %><Grid item xs={12} sm={12} md={12} >
                <TextField
                    name="<%= field[0] %>"
                    label="<%= field[0] %>"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={props.values.<%= field[0] %>}
                    error={props.errors.<%= field[0] %> && props.touched.<%= field[0] %> ? true : false}
                    helperText={props.errors.<%= field[0] %> && props.touched.<%= field[0] %> ? props.errors.<%= field[0] %> : null}
                    onBlur={e => { props.handleBlur(e); props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
                    onChange={props.handleChange}
                />
            </Grid>
            <% }) %>
        </Grid>
    </Container>
}
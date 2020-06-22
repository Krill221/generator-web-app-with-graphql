/*
    example:
        <<%=model%>Edit itemId={props.values.<%=small_model%>} />
        <<%=model%>Edit itemId={props.values.<%=small_model%>} onSave={handleSave} onDelete={handleDelete} />
*/
import React from 'react';
import { Button, TextField, Grid } from '@material-ui/core';
import Form from './_form';
////g-key import components
////g-key import queries
////g-key import helpers

export default function Edit(props) {

    const itemId = props.itemId;
    const [save, setSave] = React.useState(false);
    const afterSubmit = () => { (save && props.onSave !== undefined) && props.onSave(); }

    return <Form itemId={itemId} onSave={props.onSave} onChange={props.onChange} afterSubmit={afterSubmit} onDelete={props.onDelete}>
            {props =>
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
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                        />
                    </Grid>
                    <% }) %>
                    
                    <Grid item xs={12} sm={12} md={12} >
                        <input id='id' name="id" type='hidden' value={props.values.id} />
                        <Button className='save-button' fullWidth onClick={() => { setSave(true); props.submitForm(); }} disabled={props.isSubmitting} variant="contained" color="primary">save</Button>
                    </Grid>
                    
                </Grid>
            }
        </Form>;
}
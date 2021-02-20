
import React from 'react';
import { TextField, Grid, Container } from '@material-ui/core';
//import { InputAdornment, IconButton } from '@material-ui/core';
//import SendIcon from '@material-ui/icons/Send';
//import { useTheme } from '@material-ui/core/styles';

export default function EditView1(props) {
    
    // const theme = useTheme();

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
                    onBlur={e => { props.handleChange(e); props.submitForm(); }}
                    onChange={props.handleChange}
                    onKeyDown={e => { /*if (e.key === 'Enter') { props.submitForm(); } */ }}
                    InputProps={{
                        /*endAdornment: <InputAdornment position="end">
                            <IconButton edge="end" className='add-button' onClick={e => { props.submitForm(); }} aria-label="search">
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>,
                        */
                    }}
                />
            </Grid>
            <% }) %>
        </Grid>
    </Container>
}
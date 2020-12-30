import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { TextField, Grid, Container } from '@material-ui/core';

export default function EditView1(props) {
    const theme = useTheme();

    return <Container>
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="username"
                    name="username"
                    label={theme.props.models.user.Username}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={props.values.username}
                    error={props.errors.username && props.touched.username ? true : false}
                    helperText={props.errors.username && props.touched.username ? props.errors.username : null}
                    onBlur={e => { props.handleChange(e); props.submitForm(); }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="email"
                    name="email"
                    label={theme.props.models.user.Email}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={props.values.email}
                    error={props.errors.email && props.touched.email ? true : false}
                    helperText={props.errors.email && props.touched.email ? props.errors.email : null}
                    onBlur={e => { props.handleChange(e); props.submitForm(); }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="password"
                    name="password"
                    label={theme.props.models.user.Password}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={props.values.password}
                    error={props.errors.password && props.touched.password ? true : false}
                    helperText={props.errors.password && props.touched.password ? props.errors.password : null}
                    onBlur={e => { props.handleChange(e); props.submitForm(); } }
                    onChange={props.handleChange}
                />
            </Grid>
        </Grid>
    </Container>
}
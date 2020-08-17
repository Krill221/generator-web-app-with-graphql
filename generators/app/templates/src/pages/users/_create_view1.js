import React from 'react';
import { TextField, Grid, Container, Button } from '@material-ui/core';

export default function CreateView1(props) {
    return <Container>
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="username"
                    name="username"
                    label="Логин"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={props.values.username}
                    error={props.errors.username && props.touched.username ? true : false}
                    helperText={props.errors.username && props.touched.username ? props.errors.username : null}
                    onBlur={e => { props.handleBlur(e); props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={props.values.email}
                    error={props.errors.email && props.touched.email ? true : false}
                    helperText={props.errors.email && props.touched.email ? props.errors.email : null}
                    onBlur={e => { props.handleBlur(e); props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="password"
                    name="password"
                    label="Пароль"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={props.values.password}
                    error={props.errors.password && props.touched.password ? true : false}
                    helperText={props.errors.password && props.touched.password ? props.errors.password : null}
                    onBlur={e => { props.handleBlur(e); props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <TextField
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Пароль второй раз"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    type="password"
                    value={props.values.confirmPassword}
                    error={props.errors.confirmPassword && props.touched.confirmPassword ? true : false}
                    helperText={props.errors.confirmPassword && props.touched.confirmPassword ? props.errors.confirmPassword : null}
                    onBlur={e => { props.handleBlur(e); props.handleChange(e); if (props.values.id !== 'new') { props.setSave(false); props.submitForm(); } }}
                    onChange={props.handleChange}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <Button className='save-button' fullWidth onClick={() => { props.setSave(true); props.submitForm(); }} disabled={props.isSubmitting} variant="contained" color="primary">Сохранить</Button>
            </Grid>
        </Grid>
    </Container>
}
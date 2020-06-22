import React from 'react';
import { useHistory } from "react-router-dom";
import { Container, Button, TextField, Grid } from '@material-ui/core';
import Form from './_form';


export default function Single(props) {

    let history = useHistory();
    const itemId = props.match.params.itemId;
    const back = '/users';

    const handleChange = () => history.push(back);
    const handleDelete = () => history.push(back);

    return (
        <Container>
            <Form itemId={itemId} onChange={handleChange} onDelete={handleDelete}>
                {props =>
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
                                onBlur={props.handleBlur}
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
                                onBlur={props.handleBlur}
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
                                onBlur={props.handleBlur}
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
                                onBlur={props.handleBlur}
                                onChange={props.handleChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} >
                            <input id='id' name="id" type='hidden' value={props.values.id} />
                            <Button fullWidth className='save-button' onClick={props.handleSubmit} disabled={props.isSubmitting} variant="contained" color="primary">save</Button>
                        </Grid>

                        {props.values.id !== 'new' && <Grid item xs={12} sm={12} md={12} >
                            <Button fullWidth className='delete-button' onClick={props.handleDelete} disabled={props.isSubmitting} variant="contained" color="secondary">delete</Button>
                        </Grid>
                        }

                        <Grid item xs={12} sm={12} md={12} >
                            <Button fullWidth className='back-button' variant="contained" color="primary" href={back}>back</Button>
                        </Grid>
                    </Grid>
                }
            </Form>
        </Container >
    );
}
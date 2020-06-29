import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import {
    Container,
    Button,
    TextField,
    Typography,
    LinearProgress,
    CssBaseline,
    Grid
} from '@material-ui/core';
import * as Yup from 'yup';
import { LOGIN_USER } from '../../queries/users'
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../auth';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Must be 2 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
});

function SignInDialog(props) {

    const context = useContext(AuthContext);
    const [err, setErr] = useState('');

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.onChange && props.onChange(context);
        },
        onError(error) {
            console.log(error);
            error.graphQLErrors[0] ? setErr(error.graphQLErrors[0].message) : setErr('unknown error');
        }
    });

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {
                    loginUser({ variables: values });
                    actions.setSubmitting(false);
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}></Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5" id='signinheader'>Вход</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Login"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={props.values.username}
                                    error={props.errors.username && props.touched.username ? true : false}
                                    helperText={props.errors.username && props.touched.username ? props.errors.username : null}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={props.values.password}
                                    error={props.errors.password && props.touched.password ? true : false}
                                    helperText={props.errors.password && props.touched.password ? props.errors.password : null}
                                    onBlur={props.handleBlur}
                                    onChange={props.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth id="signin" variant="contained" color="primary">Войти</Button>
                            </Grid>
                            <Grid item xs={12}>
                                {loading && <LinearProgress />}
                                {err && <Typography component="h6" variant="h6" id='error'>{err}</Typography>}
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Container>
    );
}
export default SignInDialog;
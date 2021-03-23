import React, { useContext } from 'react';
import { Formik } from 'formik';
import { useTheme } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
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
import { useMutation } from '@apollo/client';
import { AuthContext } from '../../__providers/authProvider';

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
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar();



    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.onChange && props.onChange(context);
        },
        onError(error) {
            console.log(error);
            enqueueSnackbar(theme.props.profile.UserNotFound, {variant: 'warning'});
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
                    {props => {

                        return <form onSubmit={props.handleSubmit}>
                            <Grid container spacing={2} >
                                <Grid item xs={12}></Grid>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h5" id='signinheader'>{theme.props.profile.SignInHeader}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={theme.props.models.users.username}
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
                                        label={theme.props.models.users.password}
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
                                    <Button type="submit" fullWidth id="signin" variant="contained" color="primary">{theme.props.profile.SignIn}</Button>
                                </Grid>
                                <Grid item xs={12}>
                                    {loading && <LinearProgress />}
                                </Grid>
                            </Grid>
                        </form>
                    }}
                </Formik>
            </Container>
    );
}
export default SignInDialog;
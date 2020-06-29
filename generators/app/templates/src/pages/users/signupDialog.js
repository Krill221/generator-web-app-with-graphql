import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Button,
  TextField,
  Typography,
  LinearProgress,
  CssBaseline,
  Grid,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from '../../queries/users'
import { AuthContext } from '../../auth';


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Must be 2 characters or more!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Must be 6 characters or more!')
    .max(50, 'Too Long!')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function SignUpDialog(props) {

  const context = useContext(AuthContext);
  const [err, setErr] = useState('');

  const [regUser, { loading }] = useMutation(REGISTER_USER, {
    update(
      _,
      {
        data: { register: userData }
      }
    ) {
      context.login(userData);
      props.onChange && props.onChange(context);
    },
    onError(error) {
      setErr(error.graphQLErrors[0].message);
      console.log(error);
    }
  });

  return (
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <Formik
        initialValues={{ username: '', email: '', admin: 'false', password: '', confirmPassword: '' }}
        validationSchema={SignupSchema}
        onSubmit={(values, actions) => {
          regUser({ variables: values });
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={2} >
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Typography component="h1" variant="h5" id='signupheader'>Регистрация</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
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
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={props.values.email}
                  error={props.errors.email && props.touched.email ? true : false}
                  helperText={props.errors.email && props.touched.email ? props.errors.email : null}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset" >
                  <RadioGroup aria-label="admin" name="admin" value={props.values.admin} onChange={props.handleChange}>
                    <FormControlLabel value='false' control={<Radio />} label="Пользователь" />
                    <FormControlLabel value='true' control={<Radio />} label="Менеджер отеля" />
                  </RadioGroup>
                </FormControl>
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
                  value={props.values.password}
                  error={props.errors.password && props.touched.password ? true : false}
                  helperText={props.errors.password && props.touched.password ? props.errors.password : null}
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
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={props.values.confirmPassword}
                  error={props.errors.confirmPassword && props.touched.confirmPassword ? true : false}
                  helperText={props.errors.confirmPassword && props.touched.confirmPassword ? props.errors.confirmPassword : null}
                  onBlur={props.handleBlur}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" id='signup' fullWidth variant="contained" color="primary">
                  Зарегистрироваться
                </Button>
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
export default SignUpDialog;
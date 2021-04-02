import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AuthContext } from '../../__providers/authProvider';
import { Button, Container, Typography, Grid, Avatar } from '@material-ui/core';
import { AuthArea } from '../../__components/authArea';
import { useTheme } from '@material-ui/core/styles';

const LargeAvatar = withStyles((theme) => ({
    root: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
}))(Avatar);

const Profile = ({ component: Component, ...rest }) => {
    const { user, logout } = useContext(AuthContext);
    const theme = useTheme();

    return <Container>
        <br />
        <br />
        <AuthArea
            publicArea={
                <Button fullWidth variant='contained' color="primary" aria-label={theme.props.profile.SignIn} id='signin'>{theme.props.profile.SignIn}</Button>
            }
            privateArea={<Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12}>
                    <LargeAvatar alt={'avatar'} src={user && user.avatar} />
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12}>
                    <Typography gutterBottom >{user && user.username}</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography gutterBottom >{user && user.email}</Typography>
                </Grid>
                <br />
                <Grid item xs={12} sm={12} md={12}>
                    <Button color="primary" fullWidth variant='contained' onClick={logout} id='signout'>{theme.props.profile.SignOut}</Button>
                </Grid>

            </Grid>
            }
        />
        <br />
        <br />
    </Container>
}

export default Profile;

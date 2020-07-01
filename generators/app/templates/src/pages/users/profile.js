import React, { useContext } from 'react';
import { AuthContext } from '../../auth';
import { Button, Container, Typography, Grid, Avatar } from '@material-ui/core';
import { AuthArea } from '../../components/authArea';

const Profile = ({ component: Component, ...rest }) => {
    const { user, logout } = useContext(AuthContext);
    return <Container>
        <br />
        <br />
        <AuthArea
            publicArea={
                <Button fullWidth variant='contained' color="primary" aria-label="signin" id='signin'>SignIn</Button>
            }
            privateArea={<Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={12} md={12}>
                    <Avatar/>
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
                    <Button color="primary" fullWidth variant='contained' onClick={logout} id='signout'>SignOut</Button>
                </Grid>

            </Grid>
            }
        />
        <br />
        <br />
    </Container>
}

export default Profile;

import React, { useContext } from 'react';
import { AuthContext } from '../auth';
import { Button } from '@material-ui/core';
import { AuthArea } from '../components/authArea';

const ProfileButtons = ({ component: Component, ...rest }) => {
    const { logout } = useContext(AuthContext);
    return <React.Fragment>
        <AuthArea
            publicArea={
                <Button color="inherit" aria-label="signin" id='signin'>Войти</Button>
            }
            privateArea={
                <Button color="inherit" onClick={logout} id='signout'>Выйти</Button>
            }
        />
    </React.Fragment>
}

export default ProfileButtons;

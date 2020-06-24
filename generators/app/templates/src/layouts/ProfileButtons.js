import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { Button } from '@material-ui/core';

const ProfileButtons = ({ component: Component, ...rest }) => {
    const { user, logout } = useContext(AuthContext);
    let history = useHistory();
    return user ? <Button color="inherit" onClick={logout} id='signout'>Выйти</Button>
        :
        <React.Fragment>
            <Button color="inherit" onClick={() => history.push('/signin')} id='signout'>Войти</Button>
            <Button color="inherit" onClick={() => history.push('/signup')} id='signout'>Регистрация</Button>
        </React.Fragment>
}

export default ProfileButtons;

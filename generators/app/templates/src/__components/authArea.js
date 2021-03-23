/*
<AuthArea
    publicArea={
        <div>1</div>
    }
    privateArea={
        <div>2</div>}
/>
*/
import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../__providers/authProvider';
import {
    Button, Dialog, AppBar, Toolbar, IconButton
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SignInDialog from '../pages/users/signinDialog';
import SignUpDialog from '../pages/users/signupDialog';


export const AuthArea = ({ publicArea, privateArea }) => {
    const [view, setView] = React.useState(false);
    const [reg, setReg] = React.useState(false);
    const { user } = useContext(AuthContext);
    return user ?
        privateArea
        :
        <React.Fragment>
            <label onClick={(e) => { e.preventDefault(); setView(true) }} >
                {publicArea}
            </label>
            <Dialog fullScreen open={view}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setView(false)}>
                            <ArrowBack />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {reg ?
                    <React.Fragment>
                        <SignUpDialog onChange={() => { setView(false); setReg(false) }} />
                        <Button onClick={() => setReg(false)}>Войти</Button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <SignInDialog onChange={() => { setView(false); setReg(false) }} />
                        <Button onClick={() => setReg(true)}>Зарегистрироваться</Button>
                    </React.Fragment>
                }
            </Dialog>
        </React.Fragment>
}
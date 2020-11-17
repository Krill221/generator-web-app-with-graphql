import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth';
import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar, Typography, Button,
    BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
//import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TopAppBar from '../components/topAppBar';

const useStyles = makeStyles((theme) => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
    },
}));

const Layout = (props) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    let history = useHistory();
    const theme = useTheme();
    const is_mobile = useMediaQuery(theme.breakpoints.up('sm'));
    const [value, setValue] = React.useState(props.location.pathname);
    return (
        <React.Fragment>
            {is_mobile ?
                <TopAppBar position="sticky">
                    <Toolbar id="menu">
                        <Button color="inherit" onClick={() => history.push('/')} startIcon={<HomeIcon />}>Main</Button>
                        <Typography style={{ flexGrow: 1 }} variant="h5" noWrap />
                        {user ?
                            <Button color="inherit" onClick={() => history.push('/profile')} startIcon={<AccountCircleIcon />} >Profile</Button>
                            :
                            <Button color="inherit" onClick={() => history.push('/profile')} startIcon={<AccountCircleIcon />} >SignIn</Button>
                        }
                    </Toolbar>
                </TopAppBar>
                :
                <BottomNavigation
                    className={classes.stickToBottom}
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        history.push(newValue)
                    }}
                    showLabels
                >
                    <BottomNavigationAction value='/' label="Main" icon={<HomeIcon />} />
                    {user ?
                        <BottomNavigationAction value='/profile' label="Profile" icon={<AccountCircleIcon />} />
                        :
                        <BottomNavigationAction value='/profile' label="SignIn" icon={<AccountCircleIcon />} />
                    }
                </BottomNavigation>
            }
        </React.Fragment>
    );
};
export default Layout;

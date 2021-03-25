import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { AuthContext } from '../__providers/authProvider';
import { makeStyles } from '@material-ui/core/styles';
import {
    Toolbar, Typography, Button,
    BottomNavigation, BottomNavigationAction
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TopAppBar from '../__views/AppBarView/AppBarTop';
import { Link } from "react-router-dom";
import menuItems from './menuItems';


const useStyles = makeStyles((theme) => ({
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        zIndex: 1000,
    },
}));

const Layout = ({ history }) => {
    const { user } = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    const is_mobile = useMediaQuery(theme.breakpoints.up('sm'));
    const value = `/${history.location.pathname.split('/')[1]}`;
    return (
        <React.Fragment>
            {is_mobile ?
                <TopAppBar position="sticky">
                    <Toolbar id="menu">
                        {
                            menuItems.map((item, index) => (
                                <Button key={index} color={(value === item.to ? 'primary' : 'inherit')} component={Link} to={item.to} startIcon={item.icon}>{theme.props.menu[item.label]}</Button>
                            ))
                        }
                        <Typography style={{ flexGrow: 1 }} variant="h5" noWrap />
                        <Button color={(value === '/profile' ? 'primary' : 'inherit')} component={Link} value='/profile' to='/profile' startIcon={<AccountCircleIcon />} >{user ? theme.props.menu.Profile : theme.props.menu.SignIn}</Button>
                    </Toolbar>
                </TopAppBar>
                :
                <BottomNavigation
                    className={classes.stickToBottom}
                    value={value}
                    showLabels
                >
                    {
                        menuItems.map((item, index) => (
                            <BottomNavigationAction key={index} component={Link} value={item.to} to={item.to} label={theme.props.menu[item.label]} icon={item.icon} />
                        ))
                    }
                    <BottomNavigationAction component={Link} value='/profile' to='/profile' label={user ? theme.props.menu.Profile : theme.props.menu.SignIn} icon={<AccountCircleIcon />} />
                </BottomNavigation>
            }
        </React.Fragment>
    );
};
export default Layout;

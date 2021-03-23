import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';

const menuItems = [
    {
        to: '/',
        icon: <HomeIcon />,
        label: 'Main',
    },
    {
        to: '/users',
        icon: <PeopleIcon />,
        label: 'Users',
    },
];

export default menuItems;
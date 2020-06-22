import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import { ruRU } from '@material-ui/core/locale';
import MainLayout from './layouts/MainLayout';
//import EmptyLayout from './layouts/EmptyLayout';
import PublicLayout from './layouts/PublicLayout';
import { Users, SingleUser, SignIn, SignUp } from './pages/users';
//top for generator

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
}, ruRU);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <React.Fragment>
            <MainLayout exact path="/" component={Users} />
            <PublicLayout exact path="/signin" component={SignIn} />
            <PublicLayout exact path="/signup" component={SignUp} />
            <MainLayout exact path="/users" component={Users} />
            {/*list for generator*/}

            <MainLayout exact path="/users/:itemId" component={SingleUser} />
            {/*single for generator*/}

          </React.Fragment>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

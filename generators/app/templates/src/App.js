import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AuthProvider } from './auth';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import Menu from './layouts/Menu';
import Footer from './layouts/Footer';
import { ruRU } from '@material-ui/core/locale';
import PrivateMainLayout from './layouts/PrivateMainLayout';
import PublicMainLayout from './layouts/PublicMainLayout';
import { Users, Profile } from './pages/users';
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
      <CssBaseline />
      <AuthProvider>
        <Router>
          <React.Fragment>
            <Route exact path="/:menu([\D]*)" component={Menu} />
            <Route exact path="/">
              <Redirect to="/profile" />
            </Route>
            {/*users*/}
            <PrivateMainLayout path="/users" component={Users} />
            <PublicMainLayout exact path="/profile" component={Profile} />
            {/*list for generator*/}

            {/*single for generator*/}
            
            <Route exact path="/:menu([\D]*)" component={Footer} />

          </React.Fragment>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

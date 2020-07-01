import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './auth';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import Menu from './layouts/Menu';
import { ruRU } from '@material-ui/core/locale';
import PrivateMainLayout from './layouts/PrivateMainLayout';
import PrivatePageLayout from './layouts/PrivatePageLayout';
import PrivateEmptyLayout from './layouts/PrivateEmptyLayout';
import PublicMainLayout from './layouts/PublicMainLayout';
import PublicPageLayout from './layouts/PublicPageLayout';
import PublicEmptyLayout from './layouts/PublicEmptyLayout';
import { Users, SingleUser } from './pages/users';
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
            <PublicMainLayout exact path="/" component={Users} />
            {/*users*/}
            <PrivateMainLayout exact path="/users" component={Users} />
            <PrivateMainLayout exact path="/users/:itemId" component={SingleUser} />
            {/*list for generator*/}

            {/*single for generator*/}

          </React.Fragment>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

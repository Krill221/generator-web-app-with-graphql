import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Provides from './__providers';
import Menu from './layouts/Menu';
import PrivateMainLayout from './layouts/PrivateMainLayout';
import PublicMainLayout from './layouts/PublicMainLayout';
import Users from './pages/users';
import Profile from './pages/users/profile';

//top for generator

//<Route exact path="/" component={Menu} />


function App() {
  return (
    <Provides>
      <BrowserRouter>
          <Route path="/" render={history => <Menu history={history}/>} />
          <Route exact path="/"><Redirect to="/profile" /></Route>
          {/*users*/}
          <PrivateMainLayout path="/users" component={Users} />
          <PublicMainLayout exact path="/profile" component={Profile} />
          {/*list for generator*/}
          {/*single for generator*/}
      </BrowserRouter>
    </Provides>
  );
}

export default App;

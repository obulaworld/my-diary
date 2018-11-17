// react library
import React from 'react';

 // third party library
import { Switch, Route, BrowserRouter  } from 'react-router-dom';
import { createBrowserHistory } from 'history';

 // components
import AuthenticatedRoute from './AuthRoute';
import Home from './Home';
import Dashboard from './Dashboard';
import NotFound from './Dashboard';
import Login from '../containers/Login';

 const history = createBrowserHistory();
/**
 * desc handles routing
 */
const Router = () => (
  <BrowserRouter history={ history }>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);
 export default Router;

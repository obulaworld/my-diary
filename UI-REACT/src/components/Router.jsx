// react library
import React from 'react';

 // third party library
import { Switch, Route, Router  } from 'react-router-dom';
import history from '../history';

 // components
import AuthenticatedRoute from './AuthRoute';
import Home from './Home';
import Dashboard from './Dashboard';
import NotFound from './Dashboard';
import Login from '../containers/Login';
import Signup from '../containers/Signup/Signup';

/**
 * desc handles routing
 */
const Routes = () => (
  <Router history={ history }>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Signup} />
      <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
 export default Routes;

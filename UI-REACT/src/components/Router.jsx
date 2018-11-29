// react library
import React from 'react';

 // third party library
import { Switch, Route, Router  } from 'react-router-dom';
import history from '../history';

 // components
import AuthenticatedRoute from './AuthRoute';
import Home from './Home';
import Dashboard from '../containers/Dashboard/Dashboard';
import NotFound from './Dashboard/Dashboard';
import CreateEntry from '../containers/CreateEntry/CreateEntry';
import ViewEntry from './ViewEntry/ViewEntry';
import Login from '../containers/Login/Login';
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
      <Route exact path='/view-entry/:id' component={ViewEntry} />
      <AuthenticatedRoute exact path='/dashboard' component={Dashboard} />
      <AuthenticatedRoute exact path='/entry-add' component={CreateEntry} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
 export default Routes;

// react libraries
import React from "react";

// third party library
import { Route, Redirect } from "react-router-dom";

//components
import CheckToken from "../helpers/tokenverify";

/**
 * desc renders header with links
 */
const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      CheckToken.verifyUserToken(localStorage.getItem("token")) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
export default AuthenticatedRoute;

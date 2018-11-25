// react libraries
import React from "react";
import ReactDOM from "react-dom";

// third-party libraries
import { Provider } from "react-redux";
import configureStore from "../src/store/storeConfig";

// components
import Router from "./components/Router";

// scss
import '../public/scss/index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,

  document.getElementById("root")
);

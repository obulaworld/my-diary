// 3rd party API
import { createStore, compose, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

// reducer
import rootReducer from "../reducers";

const logger = createLogger({
  collapsed: true
});

/**
 * @desc setup redux store
 */
const configureStore = () =>
  createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk, logger),
      typeof window === "object" &&
        typeof window.devToolsExtension !== "undefined"
        ? window.devToolsExtension()
        : f => f
    )
  );
export default configureStore;

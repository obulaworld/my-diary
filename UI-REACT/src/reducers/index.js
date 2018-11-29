// redux library
import { combineReducers } from "redux";
// Moduler Importations
import signup from "./signup";
import auth from "./auth";
import login from "./login";
import entries from "./dashboard";
/**
 * @desc combines all the reducers
 */
export default combineReducers({
  auth,
  signup,
  login,
  entries
});

// modular importation
import initialState from "../store/initialState";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_PROCESSING,
  LOGIN_ERROR_CLEARED
} from "../action_types/login";
/**
 *
 * @param {object} state
 * @param {string} action
 * @desc sample of a rLOGIN
 */
export const reducer = (state = initialState.auth.login, action) => {
  switch (action.type) {
    case LOGIN_PROCESSING:
      return {
        ...state,
        processing: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        processing: false,
        message: action.payload.message,
        error: ""
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        processing: false,
        message: '',
        error: action.payload
      };
    case LOGIN_ERROR_CLEARED:
      return {
        ...state,
        processing: false,
        message: '',
        error: ''
      };
    default:
      return state;
  }
};

export default reducer;

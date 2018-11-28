// modular importation
import initialState from "../store/initialState";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_PROCESSING,
  SIGNUP_ERROR_CLEARED
} from "../action_types/signup";
/**
 *
 * @param {object} state
 * @param {string} action
 * @desc sample of a reducer
 */
export const reducer = (state = initialState.auth.signup, action) => {
  switch (action.type) {
    case SIGNUP_PROCESSING:
      return {
        ...state,
        processing: action.payload
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        processing: false,
        message: action.payload.message,
        error: ""
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        processing: false,
        message: '',
        error: action.payload
      };
    case SIGNUP_ERROR_CLEARED:
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

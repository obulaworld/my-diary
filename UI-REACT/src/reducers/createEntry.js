// modular importation
import initialState from "../store/initialState";
import {
  CREATE_SUCCESS,
  CREATE_FAILURE,
  CREATE_PROCESSING,
  CREATE_ERROR_CLEARED
} from "../action_types/login"  ;
/**
 *
 * @param {object} state
 * @param {string} action
 * @desc sample of a rLOGIN
 */
export const reducer = (state = initialState.entry, action) => {
  switch (action.type) {
    case CREATE_PROCESSING:
      return {
        ...state,
        processing: action.payload
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        processing: false,
        message: action.payload.message,
        error: "",
        entries: action.payload.entry
      };
    case CREATE_FAILURE:
      return {
        ...state,
        processing: false,
        message: '',
        error: action.payload.message
      };
    case CREATE_ERROR_CLEARED:
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


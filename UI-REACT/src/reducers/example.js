// modular importation
import initialState from "../store/initialState";
import { SAMPLE_LOGIN_SUCCESS } from "../action_types/example";
/**
 *
 * @param {object} state
 * @param {string} action
 * @desc sample of a reducer
 */
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAMPLE_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default reducer;

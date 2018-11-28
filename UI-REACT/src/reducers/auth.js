// state
import initialState from '../store/initialState';

// reducer
// import loginReducer from './login';
// import signupReducer from './signup/updateUser';

// action types
import {
  AUTHENTICATE_USER,
  LOGOUT_USER
}
  from '../action_types/auth';


/**
 * @param {object} state
 * @param {string} action
 * @desc authentication reducer
 * @returns plain object
 */
const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        isAuth: false,
      };
    default:
      return initialState;
  }
};

export default authReducer;

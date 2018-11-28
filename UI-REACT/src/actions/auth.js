// actionType
import {
  AUTHENTICATE_USER,
  LOGOUT_USER
} from '../action_types/auth';

/**
 * @param {object} data
 * @desc authenticate a user
 * @returns {object} type
*/
export function authenticateUser(data) {
  return {
    type: AUTHENTICATE_USER,
    payload: data
  };
}

/**
 * @desc logout a user
 * @returns {object} type
*/
export function logOutUser() {
  return {
    type: LOGOUT_USER,
  };
}

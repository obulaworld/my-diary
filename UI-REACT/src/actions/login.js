// third party library
import http from 'axios';

// actionType
import {
  LOGIN_PROCESSING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_ERROR_CLEARED,
} from '../action_types/login';

import history from '../history';

import { authenticateUser } from '../actions/auth';

/**
 * @param {object} data
 * @desc checking login loading
 * @returns {object} type
 */
export function loginPosting(data) {
  return {
    type: LOGIN_PROCESSING,
    payload: data,
  };
}

/**
 * @desc checking successful login
 * @returns {object} type
 */
export function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc checking unsuccessful login
 * @returns {object} type
 */
export function loginFailure(data) {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc clear error while login
 * @returns {object} type
 */
export function clearError() {
  return {
    type: LOGIN_ERROR_CLEARED,
  };
}

export const userLoginRequest = (details) => (dispatch) => {
  console.log('before go', details);
  dispatch(loginPosting(true));
  return http
    .post('https://my-diary-challenge.herokuapp.com/api/v1/auth/login', details)
    .then((payload) => {
      console.log('am back', payload);
      const { user, token } = payload.data;
      localStorage.setItem('diaryToken', token);
      dispatch(loginSuccess(payload.data));
      dispatch(authenticateUser(user));
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch(loginFailure(err.response.data.message));
    });
};

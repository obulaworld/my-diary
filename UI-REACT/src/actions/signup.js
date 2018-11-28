// third party library
import http from 'axios';

// actionType
import {
  SIGNUP_PROCESSING,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_ERROR_CLEARED,
} from '../action_types/signup';

import history from '../history';

import { authenticateUser } from '../actions/auth';

/**
 * @param {object} data
 * @desc checking login loading
 * @returns {object} type
 */
export function signupPosting(data) {
  return {
    type: SIGNUP_PROCESSING,
    payload: data,
  };
}

/**
 * @desc checking successful login
 * @returns {object} type
 */
export function signupSuccess(data) {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc checking unsuccessful login
 * @returns {object} type
 */
export function signupFailure(data) {
  return {
    type: SIGNUP_FAILURE,
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
    type: SIGNUP_ERROR_CLEARED,
  };
}

export const userSignupRequest = (details) => (dispatch) => {
  console.log('before go', details);
  dispatch(signupPosting(true));
  return http
    .post('https://my-diary-challenge.herokuapp.com/api/v1/auth/signup', details)
    .then((payload) => {
      console.log('am back', payload);
      const { user, token } = payload.data;
      localStorage.setItem('diaryToken', token);
      dispatch(signupSuccess(payload.data));
      dispatch(authenticateUser(user));
      history.push('/dashboard');
    })
    .catch((err) => {
      dispatch(signupFailure(err.response.data.message));
    });
};

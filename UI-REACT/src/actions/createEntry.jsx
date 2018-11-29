// third party library
import http from 'axios';

// actionType
import {
  CREATE_PROCESSING,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  CREATE_ERROR_CLEARED,
} from '../action_types/createEntry';

import history from '../history';

import { authenticateUser } from '../actions/auth';

/**
 * @param {object} data
 * @desc checking create loading
 * @returns {object} type
 */
export function createPosting(data) {
  return {
    type: CREATE_PROCESSING,
    payload: data,
  };
}

/**
 * @desc checking successful create
 * @returns {object} type
 */
export function createSuccess(data) {
  return {
    type: CREATE_SUCCESS,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc checking unsuccessful create
 * @returns {object} type
 */
export function createFailure(data) {
  return {
    type: CREATE_FAILURE,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc clear error while create
 * @returns {object} type
 */
export function clearError() {
  return {
    type: CREATE_ERROR_CLEARED,
  };
}

export const userCreateRequest = (details) => (dispatch) => {
  dispatch(createPosting(true));
  const verificationToken = localStorage.getItem('diaryToken');
  const options = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': `${verificationToken}`
    }
  };
  return http
    .post('https://my-diary-challenge.herokuapp.com/api/v1/entries', details, options)
    .then((payload) => {
      dispatch(createSuccess(payload.data));
      history.push(`/view-entry/${payload.data.entry[0].id}`);
    })
    .catch((err) => {
      dispatch(createFailure(err.data.message));
    });
};

// third party library
import http from 'axios';

// actionType
import {
  DASHBOARD_PROCESSING,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAILURE,
  DASHBOARD_ERROR_CLEARED,
} from '../action_types/dashboard';

import history from '../history';

import { authenticateUser } from '../actions/auth';

/**
 * @param {object} data
 * @desc checking login loading
 * @returns {object} type
 */
export function dashboardProcessing(data) {
  return {
    type: DASHBOARD_PROCESSING,
    payload: data,
  };
}

/**
 * @desc checking successful login
 * @returns {object} type
 */
export function dashboardSuccess(data) {
  return {
    type: DASHBOARD_SUCCESS,
    payload: data,
  };
}
/**
 * @param {object} data
 * @desc checking unsuccessful login
 * @returns {object} type
 */
export function dashboardFailure(data) {
  return {
    type: DASHBOARD_FAILURE,
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
    type: DASHBOARD_ERROR_CLEARED,
  };
}

export const userEntriesRequest = () => (dispatch) => {
  dispatch(dashboardProcessing(true));
  const verificationToken = localStorage.getItem('diaryToken');
  const options = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'x-access-token': `${verificationToken}`
    }
  };
  return http
    .get('https://my-diary-challenge.herokuapp.com/api/v1/entries', options)
    .then((payload) => {
      console.log('am back', payload);
      if(payload.data.entries){
        dispatch(dashboardSuccess(payload.data));
      }else{
        dispatch(dashboardFailure(payload.data));
      }
    })
    .catch((err) => {
      dispatch(loginFailure(err.data.message));
    });
};

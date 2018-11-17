// action types
import { SAMPLE_LOGIN_SUCCESS } from "../actionTypes/sample";

/**
 * @param {object} score
 * @desc sample of an action
*/
export const setPlayerScore = score => {
    return {
      type: SAMPLE_LOGIN_SUCCESS,
      score: score
    };
  };

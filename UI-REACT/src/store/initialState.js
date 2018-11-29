/**
 * @desc the initial state on the application
 */
const initialState = {
  auth: {
    login: {
      processing: false,
      error: "",
      message: ""
    },
    signup: {
      processing: false,
      error: "",
      message: ""
    },
    user: {},
    isAuth: false
  },
  entries: {
    processing: false,
    error: "",
    message: "",
    entries: []
  }
};
export default initialState;

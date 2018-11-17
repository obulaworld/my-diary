// third-party libraries
import jwt from "jsonwebtoken";

const auth = {
  /**
   * @static
   * @param {string} token
   * @description Verifies user token
   * @return {object} object
   */
  verifyToken(token) {
    let decoded = {};
    try {
      decoded = jwt.decode(token);
    } catch (error) {
      decoded = {
        error: error.message
      };
    }
    return decoded;
  },

  /**
   * @static
   * @param {string} token
   * @param {boolean} responses
   * @param {function} next
   * @description Verifies user token
   * @return {object} object
   */
  verifyUserToken(token) {
    if (!token) {
      return false;
    }

    const decoded = auth.verifyToken(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return false;
    }
    return true;
  },

  decodeToken(token) {
    let decoded = {};
    try {
      decoded = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      decoded = {
        error: error.message
      };
    }
    return decoded;
  }
};

export default auth;

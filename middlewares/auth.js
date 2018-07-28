/**
 * Created by obulaworld on 7/26/18.
 */
// Reference => https://github.com/DinmaOtutu/RIDE-MY-WAY/
import jwt from 'jsonwebtoken';

const auth = {
  authenticate(user) {
    return jwt.sign({
      id: user.id,
      email: user.email,
    }, process.env.SECRET, {
      expiresIn: '48h',
    });
  },

  verifyToken(token) {
    let decoded = {};
    try {
      decoded.payload = jwt.verify(token, process.env.SECRET);
    } catch (error) {
      decoded = {
        error: error.message,
      };
    }
    return decoded;
  },

  verifyUserToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided.' });
    }
    const decoded = auth.verifyToken(token);

    if (decoded.error) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }
    req.body.user = decoded.payload;
    next();
  },
};

export default auth;

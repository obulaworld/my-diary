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
};

export default auth;

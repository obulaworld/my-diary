/**
 * Created by obulaworld on 7/26/18.
 */
/**
 * Created by obulaworld on 7/26/18.
 */
import Joi from 'joi';

export default (user) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return Joi.validate(user, schema);
};

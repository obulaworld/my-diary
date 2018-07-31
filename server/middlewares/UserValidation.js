/**
 * Created by obulaworld on 7/26/18.
 */
import Joi from 'joi';

export default (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    next();
  }
};

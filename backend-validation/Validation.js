import Joi from 'joi';

const check = {
 validate(req, res, next) {
     const schema = Joi.object().keys({
         title: Joi.string().required(),
         category: Joi.string().required(),
         sub_category: Joi.string().required(),
         content: Joi.string().required(),
     });
     const { error } = Joi.validate(req.body, schema);
     if (error) {
         return res.status(400).json({error: error.details[0].message});
     } else {
         next();
     }
 }
};

export default check;

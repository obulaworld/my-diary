/**
 * Created by obulaworld on 7/26/18.
 */
import bcrypt from 'bcrypt';
import validateUser from '../backend-validation/user_validation';
import validateUser2 from '../backend-validation/login_validation';
import auth from '../middlewares/auth';
import db from '../db';


class UserController {
  static createUser(req, res, next) {
    const values = {
      name: req.body.register_full_name,
      email: req.body.register_email,
      password: req.body.register_password,
    };
    const { error } = validateUser(values);
    if (error) res.status(400).json({ error: error.details[0].message });
    const check = `SELECT * FROM users where email = '${req.body.register_email}'`;
    db.connect((error1, client, done) => {
      if (error1) return next(error1);
      return client.query(check, (error2, res2) => {
        if (error2) return done(next(error2));
        if (res2.rows.length) {
          res.status(409).json({ error: `Email ${req.body.register_email} already exists` });
          done();
        }
        const hash = bcrypt.hashSync(req.body.register_password, 10);
        const query = {
          text: `insert into users (
            name, email, password
          ) values ($1, $2, $3)returning id, name, email`,
          values: [
            req.body.register_full_name, req.body.register_email,
            hash,
          ],
        };
        return client.query(query, (error3, res3) => {
          done();
          if (error3) return done(next(error3));
          const createdUser = res3.rows[0];
          const userToken = auth.authenticate(createdUser);
          return res.status(201).send({
            success: 'success',
            user: createdUser,
            token: userToken,
          });
        });
      });
    });
  }

  static loginUser(req, res, next) {
    const values = {
      email: req.body.login_email,
      password: req.body.login_password,
    };
    const { error } = validateUser2(values);
    if (error) res.status(400).json({ error: error.details[0].message });
    const query = {
      text: 'select id, name, password, is_notifiable from users where email = $1 LIMIT 1',
      values: [
        req.body.login_email,
      ],
    };
    db.query(query, (error1, response) => {
      if (error1) return next(error1);
      const user = response.rows[0];
      if (!response.rows.length) {
        return res.status(401).send({
          error: 'Sorry, Invalid E-mail',
        });
      }
      const check = bcrypt.compareSync(req.body.login_password, user.password);
      if (check) {
        const token = auth.authenticate(user);
        delete user.password;
        return res.status(200).send({
          user, token,
        });
      } else {
        return res.status(401).send({
                  error: 'Invalid Password',
        });
      }
    });
  }
}
export default UserController;

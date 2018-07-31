/**
 * Created by obulaworld on 7/26/18.
 */
import bcrypt from 'bcrypt';
import auth from '../middlewares/auth';
import db from '../../db';

class UserController {
  static createUser(req, res) {
    const check = `SELECT * FROM users where email = '${req.body.email}'`;
    db.connect((error1, client) => {
      if (error1) {
          res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
      } else {
          return client.query(check, (error2, res2) => {
              if (error2) {
                   res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
              }else{
                  if (res2.rows.length) {
                       res.status(409).json({ error: `Email ${req.body.email} already exists` });
                  } else {
                      const hash = bcrypt.hashSync(req.body.password, 10);
                      const query = { text: `insert into users ( name, email, password ) values ($1, $2, $3)returning id, name, email`,
                          values: [ req.body.name, req.body.email, hash,],
                      };
                      return client.query(query, (error3, res3) => {
                          if (error3) {
                               res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                          } else {
                              const createdUser = res3.rows[0];
                              const userToken = auth.authenticate(createdUser);
                              return res.status(201).send({
                                  success: 'success',
                                  user: createdUser,
                                  token: userToken,
                              });
                          }
                      });
                  }
              }
          });
      }
    });
  }

  static loginUser(req, res) {
    const query = {
      text: 'select id, name, password, is_notifiable from users where email = $1 LIMIT 1',
      values: [req.body.email ],
    };
    db.query(query, (error1, response) => {
      if (error1) {
          res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
      }else{
          const user = response.rows[0];
          if (!response.rows.length) {
              return res.status(401).send({ error: 'Sorry, Invalid E-mail' });
          }else{
              const check = bcrypt.compareSync(req.body.password, user.password);
              if (check) {
                  const token = auth.authenticate(user);
                  delete user.password;
                  return res.status(200).send({ user, token });
              } else {
                  return res.status(401).send({ error: 'Invalid Password' });
              }
          }
      }
    });
  }
}
export default UserController;

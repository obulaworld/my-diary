/**
 * Created by obulaworld on 7/24/18.
 */
import validateEntry from '../backend-validation/validation';
import auth from '../middlewares/auth';
import db from '../db';

class DiaryController {
  static home(req, res) {
    res.send('Andela BootCamp Challenge 2.....Welcome to My Diary Api Endpoints Written by Obuladike Chisom.....');
  }

  static createEntry(req, res, next) {
    const { error } = validateEntry(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const check = auth.verifyUserToken(req);
    if (check === 401) {
      res.status(401).json({ error: 'No token provided.' });
    } else if (check === 500) {
      res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [check.id],
      };
      db.query(query, (error2, response) => {
        if (error2) return next(error2);
        if (response.rows.length > 0) {
          const query2 = {
            text: `INSERT INTO entries (user_id, title, category, sub_category, content)
             VALUES ($1,$2,$3,$4,$5)`,
            values: [
              check.id, req.body.title, req.body.category, req.body.sub_category,
              req.body.content,
            ],
          };
          db.query(query2, (error3, res3) => {
            if (error3) return next(error3);
            return res.status(201).json({ success: 'Entry Created successfully' });
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }

  static editEntry(req, res, next) {
    const { error } = validateEntry(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const check = auth.verifyUserToken(req);
    if (check === 401) {
      res.status(401).json({ error: 'No token provided.' });
    } else if (check === 500) {
      res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [check.id],
      };
      db.query(query, (error, response) => {
        if (error) return next(error);
        if (response.rows.length > 0) {
          const query2 = {
            text: 'Select * from entries where id = $1 LIMIT 1',
            values: [
              req.params.id,
            ],
          };
          db.query(query2, (error2, res2) => {
            if (error2) return next(error2);
            if (!res2.rows.length) return res.status(404).json({ error: 'Entry to modify not found' });
            const query3 = {
              text: `UPDATE entries SET  title = $1, category = $2, sub_category = $3,
               content = $4 WHERE id = $5`,
              values: [
                req.body.title, req.body.category, req.body.sub_category,
                req.body.content, req.params.id,
              ],
            };
            db.query(query3, (error3, res3) => {
              if (error3) return next(error3);
              return res.status(200).json({ success: 'Entry was updated successfully' });
            });
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }

  static getEntryById(req, res, next) {
    const check = auth.verifyUserToken(req);
    if (check === 401) {
      res.status(401).json({ error: 'No token provided.' });
    } else if (check === 500) {
      res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [check.id],
      };
      db.query(query, (error, response) => {
        if (error) return next(error);
        if (response.rows.length > 0) {
          const query2 = {
            text: 'Select * from entries where id = $1 LIMIT 1',
            values: [
              req.params.id,
            ],
          };
          db.query(query2, (error2, res2) => {
            if (error2) return next(error2);
            return res.status(200).json({ success: 'Success', entry: res2.rows });
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }

  static getAllEntries(req, res, next) {
    const check = auth.verifyUserToken(req);
    if (check === 401) {
      res.status(401).json({ error: 'No token provided.' });
    } else if (check === 500) {
      res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [check.id],
      };
      db.query(query, (error, response) => {
        if (error) return next(error);
        if (response.rows.length > 0) {
          const query2 = {
            text: 'Select * from entries where user_id = $1',
            values: [
              check.id,
            ],
          };
          db.query(query2, (error2, res2) => {
            if (error2) return next(error2);
            return res.status(200).json({ success: 'Success', entries: res2.rows });
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }

  static deleteEntry(req, res, next) {
    const check = auth.verifyUserToken(req);
    if (check === 401) {
      res.status(401).json({ error: 'No token provided.' });
    } else if (check === 500) {
      res.status(500).json({ error: 'Failed to authenticate token.' });
    } else {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [check.id],
      };
      db.query(query, (error, response) => {
        if (error) return next(error);
        if (response.rows.length > 0) {
          const query2 = {
            text: 'DELETE from entries where id = $1 LIMIT 1',
            values: [
              req.params.id,
            ],
          };
          db.query(query2, (error2, res2) => {
            if (error2) return next(error2);
            return res.status(200).json({ success: 'Successful' });
          });
        } else {
          return res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }
}
export default DiaryController;

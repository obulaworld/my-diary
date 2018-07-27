/**
 * Created by obulaworld on 7/24/18.
 */
import allEntries from '../backend-all-entries/all-entries';
import CreateEntry from '../backend-model/diary_entry_model';
import validateEntry from '../backend-validation/validation';
import auth from '../middlewares/auth';
import db from '../db';

class DiaryController {
  static home(req, res) {
    res.send('Andela BootCamp Challenge 2.....Welcome to My Diary Api Endpoints Written by Obuladike Chisom.....');
  }

  static createEntry(req, res) {
    const { error } = validateEntry(req.body);
    if (error) res.status(400).json({ error: error.details[0].message });
    const id = allEntries.length + 1;
    const entryAdded = new CreateEntry(id, req.body.title, req.body.category, req.body.sub_category,
      req.body.content);
    allEntries.push(entryAdded);
    res.status(201).json({ success: 'success', entry: entryAdded });
  }

  static editEntry(req, res) {
    const entryToModify = allEntries.find(e => e.id === parseInt(req.params.id, 10));
    if (!entryToModify || entryToModify === undefined) {
      res.status(404).json({
        error: 'The entry you wish to modify must have been removed or have not been created',
      });
    }
    const { error } = validateEntry(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    entryToModify.title = req.body.title;
    entryToModify.category = req.body.category;
    entryToModify.sub_category = req.body.sub_category;
    entryToModify.content = req.body.content;
    res.status(200).json({ success: 'success', entry: entryToModify });
  }

  static getEntryById(req, res,next) {
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
            res.status(200).json({ success: 'Success', entry: res2.rows });
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }

  static getAllEntries(req, res,next) {
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
            res.status(200).json({ success: 'Success', entries: res2.rows });
          });
        } else {
          res.status(404).json({ error: 'User not found' });
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
            res.status(200).json({ success: 'Successful' });
          });
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      });
    }
  }
}
export default DiaryController;

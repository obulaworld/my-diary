/**
 * Created by obulaworld on 7/24/18.
 */
import db from '../db';

class DiaryController {
  static home(req, res) {
    res.send('Andela BootCamp Challenge 2.....Welcome to My Diary Api Endpoints Written by Obuladike Chisom.....');
  }

  static createEntry(req, res) {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [req.body.user.id],
      };
      db.query(query, (error2, response) => {
        if (error2) {
            return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        }else {
            if (response.rows.length > 0) {
                const query2 = {
                    text: `INSERT INTO entries (user_id, title, category, sub_category, content)
             VALUES ($1,$2,$3,$4,$5)`,
                    values: [
                        req.body.user.id, req.body.title, req.body.category, req.body.subCategory,
                        req.body.content,
                    ],
                };
                db.query(query2, (error3, res3) => {
                    if (error3){
                        return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                    }else{
                        return res.status(201).json({ success: 'Entry Created successfully' });
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }
      });
  }

  static editEntry(req, res) {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [req.body.user.id],
      };
      db.query(query, (error, response) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        }else{
            if (response.rows.length > 0) {
                const query2 = {
                    text: 'Select * from entries where id = $1 LIMIT 1',
                    values: [
                        req.params.id,
                    ],
                };
                db.query(query2, (error2, res2) => {
                    if (error2) {
                        return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                    }else{
                        if (!res2.rows.length){return res.status(404).json({ error: 'Entry to modify not found' });} else{
                            const query3 = {
                                text: `UPDATE entries SET  title = $1, category = $2, sub_category = $3,
               content = $4 WHERE id = $5`,
                                values: [
                                    req.body.title, req.body.category, req.body.subCategory,
                                    req.body.content, req.params.id,
                                ],
                            };
                            db.query(query3, (error3, res3) => {
                                if (error3) {
                                    return res.status(500).json({ error: 'Update was not successful at this time, Try Again' });
                                }
                                return res.status(200).json({ success: 'Entry was updated successfully' });
                            });
                        }
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }
      });
  }

  static getEntryById(req, res) {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [req.body.user.id],
      };
      db.query(query, (error, response) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        }else{
            if (response.rows.length > 0) {
                const query2 = {
                    text: 'Select * from entries where id = $1 LIMIT 1',
                    values: [
                        req.params.id,
                    ],
                };
                db.query(query2, (error2, res2) => {
                    if (error2) {
                        return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                    }else{
                        return res.status(200).json({ success: 'Success', entry: res2.rows });
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }
      });
  }

  static getAllEntries(req, res) {
      const query = {
        text: 'Select * from users where id = $1 LIMIT 1',
        values: [req.body.user.id],
      };
      db.query(query, (error, response) => {
        if (error) {
            return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        } else {
            if (response.rows.length > 0) {
                const query2 = {
                    text: 'Select * from entries where user_id = $1',
                    values: [
                        req.body.user.id,
                    ],
                };
                db.query(query2, (error2, res2) => {
                    if (error2) {
                        return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                    }else{
                        return res.status(200).json({ success: 'Success', entries: res2.rows });
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }
      });
  }

  static deleteEntry(req, res) {
    const query = {
      text: 'Select * from users where id = $1 LIMIT 1',
      values: [req.body.user.id],
      };
    db.query(query, (error, response) => {
        if (error){
            return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        } else{
            if (response.rows.length > 0) {
                const query2 = {
                    text: 'DELETE from entries where id = $1 LIMIT 1',
                    values: [
                        req.params.id,
                    ],
                };
                db.query(query2, (error2, res2) => {
                    if (error2){
                        return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
                    } else{
                        return res.status(200).json({ success: 'Successful' });
                    }
                });
            } else {
                return res.status(404).json({ error: 'User not found' });
            }
        }
      });
  }
}
export default DiaryController;

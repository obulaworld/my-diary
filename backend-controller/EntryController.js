/**
 * Created by obulaworld on 7/24/18.
 */
import db from '../db';

class EntryController {
  static home(req, res) {
    res.send('Andela BootCamp Challenge 2.....Welcome to My Diary Api Endpoints Written by Obuladike Chisom.....');
  }

  static createEntry(req, res) {
      const query2 = {
        text: 'INSERT INTO entries (user_id, title, category, sub_category, content) VALUES ($1,$2,$3,$4,$5) returning id, user_id, title, category, sub_category, content',
        values: [
          req.body.user.id, req.body.title, req.body.category, req.body.subCategory,
          req.body.content,
        ],
      };
      db.query(query2, (error3, res3) => {
        if (error3){
          return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
        } else {
          return res.status(201).json({ success: 'Entry Created successfully', entry: res3.rows});
        }
      });
  }

  static editEntry(req, res) {
          const query2 = {
            text: 'Select * from entries where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.id, req.body.user.id ],
          };
          db.query(query2, (error2, res2) => {
            if (error2) {
              return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
            } else {
              if (!res2.rows.length){return res.status(404).json({ error: 'Entry to modify not found or does not belong to you' });} else{
                const query3 = {
                  text: `UPDATE entries SET  title = $1, category = $2, sub_category = $3,
   content = $4 WHERE id = $5 returning id, title, category, sub_category, content`,
                  values: [
                    req.body.title, req.body.category, req.body.subCategory,
                    req.body.content, req.params.id,
                  ],
                };
                db.query(query3, (error3, res3) => {
                  if (error3) {
                    return res.status(500).json({ error: 'Update was not successful at this time, Try Again' });
                  }
                  return res.status(200).json({ success: 'Entry was updated successfully', entry: res3.rows});
                });
              }
            }
          });
  }

  static getEntryById(req, res) {
        const query2 = {
            text: 'Select * from entries where id = $1 AND user_id = $2 LIMIT 1',
            values: [req.params.id, req.body.user.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
            }else{
                if(res2.rows.length){
                    return res.status(200).json({ success: 'Success', entry: res2.rows });
                }else{
                    return res.status(404).json({ error: 'The entry must have been deleted or does not belong to you' });
                }
            }
        });
  }

  static getAllEntries(req, res) {
        const query2 = {
            text: 'Select * from entries where user_id = $1',
            values: [req.body.user.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(500).json({ error: 'Something went wrong with the process, Please try later' });
            }else{
                return res.status(200).json({ success: 'Success', entries: res2.rows });
            }
        });
  }

  static deleteEntry(req, res) {
      const query2 = {
          text: 'SELECT from entries where id = $1 AND user_id = $2 LIMIT 1',
          values: [req.params.id, req.body.user.id],
      };
      db.query(query2, (error2, res2) => {
          if (error2) {
              return res.status(500).json({error: 'Something went wrong with the process, Please try later'});
          } else {
              if (res2.rows.length) {
                  const query2 = {
                      text: 'DELETE from entries where id = $1',
                      values: [req.params.id],
                  };
                  db.query(query2, (error2, res2) => {
                      if (error2) {
                          return res.status(500).json({error: 'Something went wrong with the process, Please try later'});
                      } else {
                          return res.status(200).json({success: 'Entry Successfully deleted'});
                      }
                  });
              } else {
                  return res.status(404).json({error: 'The entry you wish to delete was not found or does not belong to you'});
              }
          }
      });
  }
}
export default EntryController;

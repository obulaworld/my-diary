/**
 * Created by obulaworld on 7/24/18.
 */
import db from '../../db';

class EntryController {
   home(req, res) {
    res.status(200).render('index.html');
  }

   createEntry(req, res) {
      const query2 = {
        text: 'INSERT INTO entries (user_id, title, category, sub_category, content) VALUES ($1,$2,$3,$4,$5) returning id, user_id, title, category, sub_category, content',
        values: [
          req.decoded.id, req.body.title, req.body.category, req.body.subCategory,
          req.body.content,
        ],
      };
      db.query(query2, (error3, res3) => {
        if (error3){
          return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
        } else {
          return res.status(201).json({ success: true, message: 'Entry Created successfully', entry: res3.rows });
        }
      });
  }

   editEntry(req, res) {
            const query5 = {text: 'Select * from entries where id = $1', values: [req.params.id], };
            db.query(query5, (error5, res5) => {
                if(error5){return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });};
                if(res5.rows.length){
                    const query2 = {
                        text: 'Select * from entries where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.id, req.decoded.id ],
                    };
                    db.query(query2, (error2, res2) => {
                        if (error2) {
                            return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
                        } else {
                            if (!res2.rows.length) {return res.status(403).json({ success: false, message: 'Entry to modify does not belong to you' });} else{
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
                                        return res.status(400).json({ success: false, message: 'Update was not successful at this time, Try Again' });
                                    }
                                    return res.status(200).json({ success: true, message: 'Entry was updated successfully', entry: res3.rows});
                                });
                            }
                        }
                    });
                }else{return res.status(404).json({ success: false, message: 'Entry not found' }); };
            });
  }

   getEntryById(req, res) {
        const query2 = {
            text: 'Select * from entries where id = $1 AND user_id = $2 LIMIT 1',
            values: [req.params.id, req.decoded.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
            }else{
                if(res2.rows.length){
                    return res.status(200).json({ success: true, message: 'Success', entry: res2.rows });
                }else{
                    return res.status(404).json({ success: false, message: 'The entry must have been deleted or does not belong to you' });
                }
            }
        });
  }

   getAllEntries(req, res) {
        const query2 = {
            text: 'Select * from entries where user_id = $1',
            values: [req.decoded.id],
        };
        db.query(query2, (error2, res2) => {
            if (error2) {
                return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
            }else{
                if(res2.rows.length > 0) {
                    return res.status(200).json({ success: true, message: 'Success', entries: res2.rows });
                } else {
                    return res.status(200).json({ success: false, message: 'You are yet to post a diary entry' });
                }
            }
        });
  }

   deleteEntry(req, res) {
      const query2 = { text: 'SELECT from entries where id = $1 LIMIT 1', values: [req.params.id],};
      db.query(query2, (error2, res2) => {
          if (error2) { return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
          } else {
              if (res2.rows.length) {
                  const query5 = { text: 'SELECT from entries where id = $1 AND user_id = $2 LIMIT 1', values: [req.params.id,  req.decoded.id] };
                  db.query(query5, (error5, res5) => {
                      if (error5) { return res.status(400).json({ success: false, message: 'Something went wrong with the process, Please try later' });
                      } else {
                          if(res5.rows.length) {
                              const query3 = { text: 'DELETE from entries where id = $1', values: [req.params.id] };
                              db.query(query3, (error3, res3) => {
                                  return res.status(200).json({ success: true, message: 'Entry Successfully deleted'});
                              });
                          } else { return res.status(403).json({ success: false, message: 'Entry does not belong to you' });
                          }
                      }
                  });
              } else { return res.status(404).json({ success: false, message: 'Entry not found' }); }
          }
      });
  }
}
export default new EntryController();

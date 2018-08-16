import db from '../../db';

const query1 = 'DROP TABLE IF EXISTS users';
const query2 = 'DROP TABLE IF EXISTS entries';

db.query(query1, (error) => {
  if (error) throw error;
  db.query(query2, (error2) => {
    if (error2) throw error2;
  });
});

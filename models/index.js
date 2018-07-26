import pg from 'pg';
import entry from './entry';
import user from './user';
import db from '../db';

// Reference => https://stackoverflow.com/questions/20813154/node-postgres-create-database
// const conStringPri = 'postgres://postgres:postgres@localhost/postgres';
// const conStringPost = 'postgres://postgres:postgres@localhost/diaries';
// const dbName = 'diaries';
// const pool = new pg.Pool();

// pool.connect(conStringPri, (err, client, done) => { // connect to postgres db
//   if (err) {
//     console.log(`Error while connecting: ${err}`);
//   }
//
//   client.query(`CREATE DATABASE ${dbName} `, (error) => { // create user's db
//     if (error) {
//       console.log('ignoring the error'); // ignore if the db is there
//       client.end(); // close the connection
//     }
//
//     // create a new connection to the new db
//     pool.connect(conStringPost, (err, clientOrg, done) => {


//         done();
//     });
//   });
// });
user(
  db, () => {
 entry(db);
  });

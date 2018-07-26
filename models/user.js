/**
 * Created by obulaworld on 7/25/18.
 */
export default (db, callback) => {
  const query = {
    text: `Create table IF NOT EXISTS users(
        id SERIAL PRIMARY KEY not null,
        name VARCHAR,
        email VARCHAR,
        password VARCHAR,
        is_notifiable BOOLEAN,
        date Timestamp
      )`,
  };

  db.query(query.text, (error) => {
    if (error) throw error;
    if (callback) callback();
  });
};

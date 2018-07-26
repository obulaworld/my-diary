/**
 * Created by obulaworld on 7/25/18.
 */
export default (db, callback) => {
  const query = {
    text: `Create table IF NOT EXISTS entries(
        id SERIAL PRIMARY KEY not null,
        title VARCHAR,
        category VARCHAR,
        sub_category VARCHAR,
        content TEXT,
        date Timestamp
      )`,
  };

  db.query(query.text, (error) => {
    if (error) throw error;
    if (callback) callback();
  });
};

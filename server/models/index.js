import query from './query';
import db from '../../db';

const userParams = {
  name: 'VARCHAR',
  email: 'VARCHAR',
  password: 'VARCHAR',
  is_notifiable: 'BOOLEAN',
  created_at: 'Timestamp',
  updated_at: 'Timestamp',
}
const entryParams = {
  user_id: 'INT',
  title: 'VARCHAR',
  category: 'VARCHAR',
  sub_category: 'VARCHAR',
  content: 'TEXT',
  created_at: 'Timestamp',
  updated_at: 'Timestamp',
}

query(db, 'users', userParams, () => {
  query(db, 'entries', entryParams);
});

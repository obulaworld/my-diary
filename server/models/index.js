import query from './query';
import db from '../../db';

const userParams = {
  name: 'VARCHAR',
  email: 'VARCHAR',
  password: 'VARCHAR',
  is_notifiable: 'BOOLEAN DEFAULT FALSE',
  created_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}
const entryParams = {
  user_id: 'INT',
  title: 'VARCHAR',
  category: 'VARCHAR',
  sub_category: 'VARCHAR',
  content: 'TEXT',
  created_at: 'date NOT NULL DEFAULT CURRENT_DATE',
  updated_at: 'date NOT NULL DEFAULT CURRENT_DATE',
}

query(db, 'users', userParams, () => {
  query(db, 'entries', entryParams);
});

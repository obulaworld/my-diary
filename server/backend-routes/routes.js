/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import Joi from 'joi';
import CreateEntry from '../backend-model/diary_entry_model';

const router = express.Router();

const validateEntry = (entry) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    category: Joi.string().required(),
    sub_category: Joi.string().required(),
    content: Joi.string().required(),
  });
  return Joi.validate(entry, schema);
};

const allEntries = [
  new CreateEntry(1, 'My First Day at School', 'Education', 'Jss1 Class', 'It was interesting..'),
  new CreateEntry(2, 'Daddy bought me a toy', 'Family', 'Toy', 'It was a sports car toy...'),
  new CreateEntry(3, 'Baby can work', 'Family', 'Baby', 'I watched baby walk from corner to corner..'),
  new CreateEntry(4, 'The best day of my life', 'Family', 'Christmas', 'Christmas was lit.....Daddy showered me with gifts'),
  new CreateEntry(5, 'My teacher flogged me', 'Education', 'Jss2', 'I wasnt among but because i was there, i received the strokes'),
  new CreateEntry(6, 'I got a new phone', 'Family', 'phone', 'Daddy bought a new iphone 6 for me'),
];

router.get('/api/v1/entries', (req, res) => {
  res.status(200).json({ success: 'successful', entries: allEntries });
});

export default router;

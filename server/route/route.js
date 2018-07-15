/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import Joi from 'joi';
import Entry from '../model/entry';

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

let entries;

router.get('/entries', (req, res) => {
  entries = [
    new Entry(1, 'My First Day at School', 'Education', 'Jss1 Class', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
    new Entry(2, 'Daddy bought me a toy', 'Family', 'Toy', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
    new Entry(3, 'Baby can work', 'Family', 'Baby', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
    new Entry(4, 'The best day of my life', 'Family', 'Christmas', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
    new Entry(5, 'My teacher flogged me', 'Education', 'Jss2', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
    new Entry(6, 'I got a new phone', 'Family', 'phone', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  ];

  res.json(entries);
});

router.post('/entries', (req, res) => {
  const { error } = validateEntry(req.body);

  if (error) {
    res.json({ error: error.details[0].message });
    return;
  }
  const id = entries.length + 1;
  const entry = new Entry(id, req.body.title, req.body.category, req.body.sub_category,
    req.body.content);
  res.json(entry);
})

export default router;
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

const entries = [
  new Entry(1, 'My First Day at School', 'Education', 'Jss1 Class', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  new Entry(2, 'Daddy bought me a toy', 'Family', 'Toy', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  new Entry(3, 'Baby can work', 'Family', 'Baby', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  new Entry(4, 'The best day of my life', 'Family', 'Christmas', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  new Entry(5, 'My teacher flogged me', 'Education', 'Jss2', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
  new Entry(6, 'I got a new phone', 'Family', 'phone', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book..'),
];

router.get('/api/v1/entries', (req, res) => {
  res.json(entries);
});

router.get('/api/v1/entries/:id', (req, res) => {
  const entryToModify = entries.find(e => e.id === parseInt(req.params.id, 10));
  if (!entryToModify || entryToModify === undefined)res.json({ error: 'The entry you requested for must have been removed or have not been created' });
  res.json({ success: 'success', entry: entryToModify });
});

router.put('/api/v1/entries/:id', (req, res) => {
  const entryToModify = entries.find(e => e.id === parseInt(req.params.id, 10));
  if (!entryToModify || entryToModify === undefined)res.json({ error: 'The entry you wish to modify must have been removed or have not been created' });

  const { error } = validateEntry(req.body);

  if (error) {
    res.json({ error: error.details[0].message });
    return;
  }

  entryToModify.title = req.body.title;
  entryToModify.category = req.body.category;
  entryToModify.sub_category = req.body.sub_category;
  entryToModify.content = req.body.content;

  res.json({ success: 'success', entry: entryToModify });
});

router.post('/api/v1/entries', (req, res) => {
  const { error } = validateEntry(req.body);

  if (error) {
    res.json({ error: error.details[0].message });
    return;
  }
  const id = entries.length + 1;
  const entryAdded = new Entry(id, req.body.title, req.body.category, req.body.sub_category,
    req.body.content);
  entries.push(entryAdded);
  res.json({ success: 'success', entry: entryAdded });
});

export default router;

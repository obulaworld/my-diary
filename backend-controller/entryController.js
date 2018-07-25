/**
 * Created by obulaworld on 7/24/18.
 */
import allEntries from '../backend-all-entries/all-entries';
import CreateEntry from '../backend-model/diary_entry_model';
import validateEntry from '../backend-validation/validation';

class DiaryController {
  static home(req, res) {
    res.send('Andela BootCamp Challenge 2.....Welcome to My Diary Api Endpoints Written by Obuladike Chisom.....');
  }

  static createEntry(req, res) {
    const { error } = validateEntry(req.body);
    if (error) res.status(400).json({ error: error.details[0].message });
    const id = allEntries.length + 1;
    const entryAdded = new CreateEntry(id, req.body.title, req.body.category, req.body.sub_category,
      req.body.content);
    allEntries.push(entryAdded);
    res.status(201).json({ success: 'success', entry: entryAdded });
  }

  static editEntry(req, res) {
    const entryToModify = allEntries.find(e => e.id === parseInt(req.params.id, 10));
    if (!entryToModify || entryToModify === undefined) {
      res.status(404).json({
        error: 'The entry you wish to modify must have been removed or have not been created',
      });
    }
    const { error } = validateEntry(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    entryToModify.title = req.body.title;
    entryToModify.category = req.body.category;
    entryToModify.sub_category = req.body.sub_category;
    entryToModify.content = req.body.content;
    res.status(200).json({ success: 'success', entry: entryToModify });
  }

  static getEntryById(req, res) {
    const entryToModify = allEntries.find(e => e.id === parseInt(req.params.id, 10));
    if (!entryToModify || entryToModify === undefined) {
      res.status(404).json({
        error: 'The entry you requested for must have been removed or have not been created',
      });
    }
    res.status(200).json({ success: 'success', entry: entryToModify });
  }

  static getAllEntries(req, res) {
    res.status(200).json({ success: 'successful', entries: allEntries });
  }

  static deleteEntry(req, res) {
    const entryToModify = allEntries.find(e => e.id === parseInt(req.params.id, 10));
    if (!entryToModify || entryToModify === undefined) {
      res.status(404).json({
        error: 'The entry you wish to delete must have been removed or have not been created',
      });
    }
    const index = allEntries.indexOf(entryToModify);
    delete allEntries[index];
    res.status(200).json({ success: 'Entry has been successfully deleted' });
  }
}
export default DiaryController;

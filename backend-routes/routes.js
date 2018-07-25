/**
 * Created by obulaworld on 7/15/18.
 */
import DiaryController from '../backend-controller/entryController';

const EntryRoute = (app) => {
  app.get('/', DiaryController.home);
  app.get('/api/v1/entries/:id', DiaryController.getEntryById);
  app.get('/api/v1/entries', DiaryController.getAllEntries);
  app.post('/api/v1/entries', DiaryController.createEntry);
  app.put('/api/v1/entries/:id', DiaryController.editEntry);
  app.delete('/api/v1/entries/:id', DiaryController.deleteEntry);
};

export default EntryRoute;

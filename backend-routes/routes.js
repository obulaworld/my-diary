/**
 * Created by obulaworld on 7/15/18.
 */
import DiaryController from '../backend-controller/entryController';
import UserController from '../backend-controller/userController';

const EntryRoute = (app) => {
  app.get('/', DiaryController.home);
  app.get('/api/v1/entries/:id', DiaryController.getEntryById);
  app.post('/api/v1/auth/signup', UserController.createUser);
  app.get('/api/v1/entries', DiaryController.getAllEntries);
  app.post('/api/v1/entries', DiaryController.createEntry);
  app.put('/api/v1/entries/:id', DiaryController.editEntry);
  app.delete('/api/v1/entries/:id', DiaryController.deleteEntry);
};

export default EntryRoute;

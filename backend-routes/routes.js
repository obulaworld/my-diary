/**
 * Created by obulaworld on 7/15/18.
 */
import DiaryController from '../backend-controller/entryController';
import UserController from '../backend-controller/userController';

const EntryRoute = (app) => {
  app.get('/', DiaryController.home);
  app.get('/entries/:id', DiaryController.getEntryById);
  app.post('/auth/signup', UserController.createUser);
  app.post('/auth/login', UserController.loginUser);
  app.get('/entries', DiaryController.getAllEntries);
  app.post('/entries', DiaryController.createEntry);
  app.put('/entries/:id', DiaryController.editEntry);
  app.delete('/entries/:id', DiaryController.deleteEntry);
};

export default EntryRoute;

/**
 * Created by obulaworld on 7/15/18.
 */
import DiaryController from '../controllers/EntryController';
import UserController from '../controllers/UserController';
import auth from '../middlewares/auth';
import validateEntry from '../middlewares/Validation';
import validateUser from '../middlewares/UserValidation';
import validateUser2 from '../middlewares/LoginValidation';


const EntryRoute = (app) => {
  app.get('/', DiaryController.home);
  app.get('/entries/:id', auth.verifyUserToken, DiaryController.getEntryById);
  app.post('/auth/signup', validateUser, UserController.createUser);
  app.post('/auth/login', validateUser2, UserController.loginUser);
  app.get('/entries', auth.verifyUserToken, DiaryController.getAllEntries);
  app.post('/entries', validateEntry.validate, auth.verifyUserToken, DiaryController.createEntry);
  app.put('/entries/:id', validateEntry.validate, auth.verifyUserToken, DiaryController.editEntry);
  app.delete('/entries/:id', auth.verifyUserToken, DiaryController.deleteEntry);
};

export default EntryRoute;

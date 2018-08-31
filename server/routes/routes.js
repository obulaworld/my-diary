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
  app.get('/api/v1/entries/:id', auth.verifyUserToken, DiaryController.getEntryById);
  app.post('/api/v1/auth/signup', validateUser, UserController.createUser);
  app.post('/api/v1/auth/login', validateUser2, UserController.loginUser);
  app.get('/api/v1/auth/user', auth.verifyUserToken, UserController.getUser);
  app.get('/api/v1/verify-token', auth.verifyUserToken2);
  app.get('/api/v1/entries', auth.verifyUserToken, DiaryController.getAllEntries);
  app.post('/api/v1/entries', auth.verifyUserToken, validateEntry.validate, DiaryController.createEntry);
  app.put('/api/v1/entries/:id',auth.verifyUserToken, validateEntry.validate, DiaryController.editEntry);
  app.delete('/api/v1/entries/:id', auth.verifyUserToken, DiaryController.deleteEntry);
};

export default EntryRoute;

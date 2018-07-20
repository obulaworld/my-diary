/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// route to go here
import router from './backend-routes/routes';

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'UI')));

app.use('/', router);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Success!! app listening on port 3000!');
});

module.exports = server;

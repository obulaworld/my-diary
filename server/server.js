/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import bodyParser from 'body-parser';
import router from './route/route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3000, () => {
    console.log('Success!! app listening on port 3000!');
});

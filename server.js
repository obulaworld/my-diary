/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


// route to go here
import router from './server/routes/routes';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
const urlParser = express.urlencoded({
  extended: true,
});

const jsonParser = express.json();
app.use(urlParser);
app.use(jsonParser);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '/UI')));
app.use('/UI-FETCH-APIs', express.static(path.join(__dirname, '/UI-FETCH-APIs')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
router(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Success!! app listening on port 3000!');
});

module.exports = server;

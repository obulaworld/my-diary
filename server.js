/**
 * Created by obulaworld on 7/15/18.
 */
import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


// route to go here
import router from './backend-routes/routes';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'UI')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api/v1', router);
router(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Success!! app listening on port 3000!');
});

module.exports = server;

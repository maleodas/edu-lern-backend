import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import fileUpload from 'express-fileupload';
import swaggerUi from 'swagger-ui-express';
import './db/db';
import { auth } from './middleware/auth';
import { cors } from './middleware/cors';
import { router } from './routes';
import swaggerDoc from './swagger/swagger-output.json';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/uploads', auth, express.static('uploads'));
app.use(cors);
app.use(router);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// serving static files
app.use(express.static(`${__dirname}/public`));
app.set('views', `${__dirname}/public/views`);
app.set('view engine', 'html');

app.get('/', (req, res) => res.send(`Nothing to show`));

export { app };

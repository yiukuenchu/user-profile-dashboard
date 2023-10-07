import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connect from './database/conn.js';
import router from './router/route.js';
import ENV from './config.js';
import * as path from 'path';

const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

/** API routes */
app.use('/api', router);

/** ---------------Deployment---------------- */
const __dirname1 = path.resolve();
if (ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname1, 'frontend', 'build', 'index.html'));
  });
} else {
  /** HTTP GET request */
  app.get('/', (req, res) => {
    res.status(201).json('Home GET Request');
  });
}

/** start server only when connected to database*/
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log('Cannot connect to the server');
    }
  })
  .catch((error) => {
    console.log('Invalid database connection');
  });

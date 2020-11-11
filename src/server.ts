import 'reflect-metadata';

import express from 'express';
import routes from './routes';
import uploadConfig from './config/uploadConfig';

import './database';

const app = express();

app.use(express.json());

app.use(routes);
app.use('/files', express.static(uploadConfig.destination));

app.listen(3333, () => {
  console.log('Server started!');
});

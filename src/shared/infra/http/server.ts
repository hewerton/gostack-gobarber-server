import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/uploadConfig';
import routes from './routes';
import errorHandler from './middlewares/errorHandler';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(uploadConfig.destination));
app.use(routes);
app.use(errorHandler);

app.listen(3333, () => {
  console.log('Server started!');
});

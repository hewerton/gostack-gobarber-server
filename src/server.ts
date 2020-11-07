import express from 'express';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());

app.get('/', (resquest, response) => {
  response.json({ mengagem: 'Olá TypeScript' });
});

app.use(routes);

app.listen(3333, () => {
  console.log('Server started!');
});

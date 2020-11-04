import express from 'express';

import routes from './routes';

const app = express();

app.get('/', (resquest, response) => {
  response.json({ mengagem: 'Olá TypeScript' });
});

app.listen(3333, () => {
  console.log('Server started!');
});

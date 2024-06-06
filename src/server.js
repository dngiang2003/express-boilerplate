const express = require('express');
const httpStatus = require('http-status');

const { env } = require('./config');

const app = express();

if (env.nodeEnv === 'development') {
  app.use(require('morgan')('dev'));
}

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    message: 'Resource not found',
    statusCode: httpStatus.NOT_FOUND,
  });
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

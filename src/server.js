const express = require('express');
const httpStatus = require('http-status');

const { env } = require('./config');
const { errorHandler, errorConverter } = require('./middlewares');

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

app.use(errorConverter);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

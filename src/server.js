const express = require('express');
const httpStatus = require('http-status');

const { env, i18n } = require('./config');
const { errorHandler, errorConverter } = require('./middlewares');

const app = express();

if (env.nodeEnv === 'development') {
  app.use(require('morgan')('dev'));
}

app.use((req, res, next) => {
  next(i18n.setLocale(req));
});

app.get('/', (req, res) => {
  res.send(i18n.translate('system.serverRunning'));
});

app.all('*', (req, res) => {
  res.status(httpStatus.NOT_FOUND).send({
    statusCode: httpStatus.NOT_FOUND,
    message: i18n.translate('system.resourceNotFound'),
  });
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

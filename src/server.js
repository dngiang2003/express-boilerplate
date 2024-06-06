const express = require('express');

const { env } = require('./config');

const app = express();

if (env.nodeEnv === 'development') {
  app.use(require('morgan')('dev'));
}

app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const adminRoutes = require('./backOffice/routes');
const { globalErrorHandler } = require('./utils/error');

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(routes);
  app.use(adminRoutes);

  app.get('/ping', (req, res) => {
    res.status(200).json({ message: 'pong' });
  });

  app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.statusCode = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('서버 에러');
  });
  app.use(globalErrorHandler);

  return app;
};

module.exports = { createApp };

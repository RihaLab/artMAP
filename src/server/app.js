#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies,no-unused-vars
import babel from 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { Server as createServer } from 'http';
import path from 'path';
import createLogger from 'debug';
import bindSocketToServer from 'socket.io';
import rootController from './controller';
import config from '../../config';
import rootSocketHandler from './socketHandler';
// import { errorMiddleware } from './middleware';

const log = createLogger('dna:app');
const app = express();
const server = createServer(app);
const io = bindSocketToServer(server);

io.on('connection', (socket) => {
  log('Incoming io connection');
  rootSocketHandler(socket);
});

if (process.env.NODE_ENV === 'dev') {
  /* eslint-disable global-require */
  /* eslint-disable import/no-extraneous-dependencies */
  log('Using DEV environment');
  const webpack = require('webpack');
  const webpackDevConfig = require('../../webpack.config.dev');
  const compiler = webpack(webpackDevConfig);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

// app.use(errorMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/api', rootController);

server.listen(config.port, config.host, () => {
  log(`Server listening on ${config.host}:${config.port}`);
});

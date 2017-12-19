import express from 'express';
import { Server as createServer } from 'http';
import path from 'path';
import createLogger from 'debug';
import bindSocketToServer from 'socket.io';
import bindToChannels from './io/index.io';

const log = createLogger('dna:app');
const app = express();
const server = createServer(app);
const io = bindSocketToServer(server);

io.on('connection', (socket) => {
  log('incoming io connection');
  bindToChannels(socket);
});

if (process.env.NODE_ENV === 'dev') {
  /* eslint-disable global-require */
  /* eslint-disable import/no-extraneous-dependencies */
  createLogger('using DEV environment');
  const webpack = require('webpack');
  const config = require('../../webpack.config.dev');
  const compiler = webpack(config);

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, () => {
  log('Server listening on port 3000');
});

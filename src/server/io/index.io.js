import createLogger from 'debug';
import routes from './route.io';

const logger = createLogger('app:io:index');

export default function bindToChannels(socket) {
  Object.keys(routes).forEach((routeKey) => {
    const route = routes[routeKey];
    logger('Registering channel', route.channel);
    socket.on(route.channel, data => route.controller.bind(null, data, socket));
  });
}

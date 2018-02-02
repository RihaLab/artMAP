import io from 'socket.io-client';
import config from '../../../config';

export default io(`http://${config.host}:${config.port}`);

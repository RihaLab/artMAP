import io from 'socket.io-client';
import config from '../../../config';

export default io(`http://localhost:${config.port}`);

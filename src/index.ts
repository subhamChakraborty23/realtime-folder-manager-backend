import http from 'http';
import config from './config/env';
import app from './app';
import { configureSocket } from './socket';

const server = http.createServer(app);
configureSocket(server);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
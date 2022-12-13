// Standard modules
import http from 'http';
import 'dotenv/config';
import 'regenerator-runtime';

// Modules from this project
import { LoggerUtil } from '../utils';
import App from '../app';

// Constants
import config from '../config/variables.config';
import { name } from '../../package.json';

const { PORT } = config;

const { exec } = require('child_process');

function execute(command, callback) {
  exec(command, (error, stdout) => { callback(stdout); });
}

const init = async () => {
  await App._init();
  const server = http.createServer(App.app);

  execute('knex migrate:latest', (stdout) => {
    console.log(stdout);
  });
  const _onError = (error) => {
    LoggerUtil.error(error.message);
  };

  const _onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`;

    LoggerUtil.info(`${name} started:`);
    LoggerUtil.info(`\tPort: ${bind}`);
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
  };

  server.listen(PORT);
  server.on('error', _onError);
  server.on('listening', _onListening);
};

module.exports = init().catch(LoggerUtil.error);

import express from 'express';
import bodyParser from 'body-parser';

import registrationTypes from '@const/registrationTypes';
import { rabbit, register, getConfig, getPort } from '@utils';

import restRouter from './routes';

const gwType = 'rest';

function getConnectionData(req) {
  return {
    ip: req.ip,
    hostname: req.ip,
    gwType,
    gwName: 'testGw',
  };
}

const rabbitConfig = {
  host: 'amqp://localhost',
};

async function init() {
  // Connect to mq and register with main server
  const { channel } = await rabbit(rabbitConfig);
  await register({ channel, type: registrationTypes.gateway });
  const config = await getConfig(
    `${process.cwd()}/config/server/config.gateway.json`,
  );

  // Create REST server
  const app = express();

  // Attach MQ connection to every request
  app.use((req, res, next) => {
    res.locals.channel = channel;
    res.locals.connection = getConnectionData(req);
    next();
  });

  app.use(bodyParser.json());
  app.use('/api', restRouter);

  // Gracefuly start the server
  const { port, message } = await getPort(config.port);
  app.listen(port, () => console.log(message));
}

init();

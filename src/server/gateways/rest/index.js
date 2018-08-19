import express from 'express';
import bodyParser from 'body-parser';

import rabbit, { register } from '@utils/mq';

import restRouter from './routes';

const gwType = 'rest';

function getConnectionData(req) {
  return {
    ip: req.ip,
    hostname: req.ip,
    gwType,
    gwName: 'testGW',
  };
}

const rabbitConfig = {
  host: 'amqp://localhost',
  replyQueue: 'REST_GW_REPLY_QUEUE',
};

async function init() {
  // Connect to mq and register with main server
  const channel = await rabbit(rabbitConfig);
  await register({ channel, type: 'rules' });

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
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

init();

import express from 'express';
import bodyParser from 'body-parser';

import { mqRegister, createQueue } from '@services/mq';
import createTaskConsumer from '@services/mq/createTaskConsumer';

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

async function onRegistrationSuccess({ message, channel }) {
  // Start REST server
  const app = express();
  const newChannel = createTaskConsumer(channel, 'GW_REPLY_QUEUE');

  // Attach MQ connection to every request
  app.use((req, res, next) => {
    res.locals.channel = newChannel;
    res.locals.replyTo = 'GW_REPLY_QUEUE';
    res.locals.connection = getConnectionData(req);
    next();
  });

  app.use(bodyParser.json());
  app.use('/api', restRouter);
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

mqRegister('gw', onRegistrationSuccess);

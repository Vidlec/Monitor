import express from 'express';
import bodyParser from 'body-parser';

import { mqInit, createQueue } from '@services/mq';

import restRouter from './routes';

async function onRegistrationSuccess({ message, channel }) {
  // Start REST server
  const app = express();
  const replyQueue = await createQueue(channel);

  // Attach MQ connection to every request
  app.use((req, res, next) => {
    res.locals.channel = channel;
    res.locals.replyQueue = replyQueue;
    res.locals.gwName = 'testGW';
    next();
  });

  app.use(bodyParser.json());
  app.use('/api', restRouter);
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

mqInit('gw', onRegistrationSuccess);

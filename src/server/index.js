import 'babel-polyfill';

import { getRules, getConfig, rabbit, consume, reply } from '@utils';
import handleOnRegistration from './handleOnRegistration';

async function init() {
  const config = await getConfig();

  // Load rules from the fs
  const rules = await getRules(config.rulesFolder);

  // Connect to mq
  const channel = await rabbit({
    host: config.rabbitMQ,
    replyQueue: 'REGISTRATION_REPLY_QUEUE',
  });

  // Set max tasks for this worker
  channel.prefetch(10);

  // Serve registration requests
  // It provides data to the worker depending on its type
  // Rules worker gets rules, DB worker gets db type etc...
  consume(
    { channel, queue: 'REGISTRATION_QUEUE', durable: false },
    ({ message, data: type }) => {
      const data = handleOnRegistration({ type, config, rules });
      reply({ channel, message, data });
    },
  );
}

init();

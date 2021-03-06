import 'babel-polyfill';

import { getRules, getConfig, rabbit, rpc } from '@utils';

import handleOnRegistration from './handleOnRegistration';
import handleManagement from './manage';

async function init() {
  const config = await getConfig(`${process.cwd()}/config/server/config.json`);

  // Load rules from the fs
  const rules = await getRules(config.rulesFolder);

  // Connect to mq
  const { channel } = await rabbit({
    host: config.rabbitMQ,
  });

  // Set max tasks for this worker
  channel.prefetch(10);

  // Serve registration requests
  // It provides data to the worker depending on its type
  // Rules worker gets rules, DB worker gets db type etc...
  rpc({ channel, queue: 'REGISTRATION_QUEUE' }, ({ content: data }) =>
    handleOnRegistration({ data, config, rules }),
  );

  rpc({ channel, queue: 'MANAGEMENT_QUEUE' }, ({ content: data }) =>
    handleManagement({ channel, data, config }),
  );
}

init();

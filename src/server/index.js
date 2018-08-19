import 'babel-polyfill';

import rabbit, { consume, reply } from '@utils/mq';
import { getRules } from './rules';

const rabbitConfig = {
  host: 'amqp://localhost',
  replyQueue: 'REGISTRATION_REPLY_QUEUE',
};

async function init() {
  // Load rules from the fs
  const rules = await getRules();

  // Connect to mq
  const channel = await rabbit(rabbitConfig);

  // Set max tasks for this worker
  channel.prefetch(10);

  consume(
    { channel, queue: 'REGISTRATION_QUEUE', durable: false },
    ({ message, data }) => {
      console.log(data);
      reply({ channel, message, data: rules });
    },
  );
}

init();

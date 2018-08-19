import { databaseQueue } from '@const/queueNames';
import rabbit, { register, rpc } from '@utils/mq';

import createDbHandler from './dbHandler';

const rabbitConfig = {
  host: 'amqp://localhost',
  replyQueue: 'DATABASE_WORKER_REPLY_QUEUE',
};

async function init() {
  // Connect to mq
  const channel = await rabbit(rabbitConfig);
  // Register with main server
  await register({ channel, type: 'DATABASE' });

  const dbHandler = await createDbHandler('mongo');

  // Set max tasks for this worker
  channel.prefetch(10);

  rpc(
    { channel, queue: databaseQueue, durable: false },
    ({ content: task }) => {
      return dbHandler(task);
    },
  );
}

init();

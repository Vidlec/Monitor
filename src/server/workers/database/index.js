import { databaseQueue } from '@const/queueNames';
import { register, rpc, rabbit } from '@utils';
import types from '@const/registrationTypes';

import createDbHandler from './dbHandler';

const rabbitConfig = {
  host: 'amqp://localhost',
};

async function init() {
  // Connect to mq
  const { channel } = await rabbit(rabbitConfig);
  // Register with main server
  const dbType = await register({ channel, type: types.database });

  const dbHandler = await createDbHandler(dbType);

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

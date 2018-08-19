import chalk from 'chalk';
import uuid from 'uuid/v4';

import { toObject } from '@utils/mqData';

import { publishTask } from '../publish';

export default function sendTask(channel, data, queue, replyTo) {
  return new Promise((resolve, reject) => {
    const correlationId = uuid();
    channel.assertQueue(queue, { durable: false });

    // Wait for event from task consumer
    channel.responseEmitter.once(correlationId, content =>
      resolve(toObject(content)),
    );

    // Send rules task
    console.log(chalk.blue('[?] Sending task'));
    publishTask({
      channel,
      correlationId,
      replyTo,
      data,
      queue,
    });
  });
}

import chalk from 'chalk';

import { publishTask } from '../publish';

export default function sendTask(channel, { queue: replyTo }, data, queue) {
  return new Promise((resolve, reject) => {
    const correlationId = 'there will be some random string for rulesTask';

    // Send rules task
    console.log(chalk.blue('[?] Sending task'));
    publishTask({
      channel,
      correlationId,
      replyTo,
      data,
      queue,
    });

    // Finished rule task recieved
    channel.consume(
      replyTo,
      message => {
        console.log(chalk.green('[✓] Recieved finshed task'));

        channel.cancel(message.fields.consumerTag);
        resolve(message.content);
      },
      {
        noAck: true,
      },
    );
  });
}

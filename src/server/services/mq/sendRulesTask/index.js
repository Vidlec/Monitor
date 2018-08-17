import chalk from 'chalk';

import { publishRuleTask } from '../publish';

export default function sendRulesTask(
  channel,
  { queue: queueName },
  data,
  connection,
) {
  return new Promise((resolve, reject) => {
    const correlationId = 'there will be some random string for rulesTask';

    // Finished rule task recieved
    channel.consume(
      queueName,
      message => {
        console.log(chalk.green('[✓] Recieved procesed rule'));
        resolve(message.content);
      },
      {
        noAck: true,
      },
    );

    // Send rules task
    console.log(chalk.blue('[?] Sending rules task'));
    publishRuleTask({
      channel,
      correlationId,
      replyTo: queueName,
      data,
      connection,
    });
  });
}

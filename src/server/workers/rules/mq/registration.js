import chalk from 'chalk';
import { consumeRegistration } from './consume';
import { publishRegistration } from './publish';

export function register(error, channel) {
  const correlationId = 'there will be some random string';

  channel.assertQueue('', { exclusive: true }, (err, { queue: queueName }) => {
    // Listen for successful registration
    console.log(chalk.blue('[?] Registering and requesting rules'));
    consumeRegistration(queueName, channel);

    // Request registration
    publishRegistration({ channel, correlationId, replyTo: queueName });
  });
}

import chalk from 'chalk';
import { awaitTasks } from './tasks';

function onRegistration(message, channel) {
  console.log(chalk.green('[✓] Recieved rules'));

  const rules = JSON.parse(message.content);
  channel.ack(message);

  awaitTasks({ rules, channel });
}

export function register(error, { queue }, channel) {
  const correlationId = 'there will be some random string';

  // Listen for rules
  console.log(chalk.blue('[?] Registering and requesting rules'));
  channel.consume(queue, message => onRegistration(message, channel), {
    noAck: false,
  });

  // Request rules
  channel.sendToQueue('registration_queue', Buffer.from('rules'), {
    correlationId,
    replyTo: queue,
  });
}

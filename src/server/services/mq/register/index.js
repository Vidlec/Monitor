import chalk from 'chalk';
import mq from 'amqplib/callback_api';

import { consumeRegistration } from '../consume';
import { publishRegistration } from '../publish';

function register(channel, successCallback, type) {
  const correlationId = 'there will be some random string';

  channel.assertQueue('', { exclusive: true }, (err, { queue: queueName }) => {
    // Listen for successful registration
    console.log(chalk.blue('[?] Registering'));
    consumeRegistration(queueName, channel, successCallback);

    // Request registration
    publishRegistration({ channel, correlationId, replyTo: queueName, type });
  });
}

export default function mqInit(type, successCallback) {
  mq.connect('amqp://localhost', (error, connection) =>
    connection.createChannel((error, channel) =>
      register(channel, successCallback, type),
    ),
  );
}

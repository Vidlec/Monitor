import chalk from 'chalk';
import mq from 'amqplib/callback_api';

import { registrationQueue } from '@const/queueNames';
import { consumeRegistration } from '../consume';
import { publishTask, replyTo } from '../publish';

function register(channel, successCallback, type) {
  const correlationId = 'there will be some random string';

  channel.assertQueue('', { exclusive: true }, (err, { queue: queueName }) => {
    // Listen for successful registration
    console.log(chalk.blue('[?] Registering'));
    consumeRegistration(queueName, channel, successCallback);

    // Request registration
    publishTask({
      channel,
      correlationId,
      replyTo: queueName,
      data: type,
      queue: registrationQueue,
    });
  });
}

export function registerServe(channel, rules) {
  channel.assertQueue(registrationQueue, { durable: false });
  console.log(chalk.blue('[...] Awaiting registration requests'));

  channel.consume(registrationQueue, message => {
    console.log(chalk.green('[✓] Recieved registration request'));

    replyTo({ channel, message, data: rules });
  });
}

export function mqConnect(successCallback) {
  mq.connect('amqp://localhost', (error, connection) =>
    connection.createChannel((error, channel) => successCallback(channel)),
  );
}

export function mqRegister(type, successCallback) {
  mqConnect(channel => register(channel, successCallback, type));
}

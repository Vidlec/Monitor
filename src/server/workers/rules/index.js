import mq from 'amqplib/callback_api';

import { register } from './mq/registration';

function handleMqConnection(error, connection) {
  connection.createChannel(register);
}

mq.connect('amqp://localhost', handleMqConnection);

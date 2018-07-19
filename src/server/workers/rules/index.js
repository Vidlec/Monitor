import mq from 'amqplib/callback_api';
import { register } from './mq/registration';

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    channel.assertQueue('', { exclusive: true }, (err, queue) =>
      register(err, queue, channel),
    );
  });
}

mq.connect('amqp://localhost', handleMqConnection);

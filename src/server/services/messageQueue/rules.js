const mq = require('amqplib/callback_api');
const chalk = require('chalk');

const rules = {
  test: '{ identifier: "some test", message: "blah" }',
};

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    const queueName = 'registration_queue';
    channel.assertQueue(queueName, { durable: false });
    console.log(chalk.blue('[...] Awaiting registration requests'));
    channel.consume(queueName, message => {
      console.log(chalk.green('[✓] Recieved registration request'));
      const {
        properties: { replyTo, correlationId },
      } = message;

      channel.sendToQueue(replyTo, Buffer.from(JSON.stringify(rules)), {
        correlationId,
      });
      channel.ack(message);
    });
  });
}

mq.connect('amqp://localhost', handleMqConnection);

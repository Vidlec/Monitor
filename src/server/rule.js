const mq = require('amqplib/callback_api');
const chalk = require('chalk');

const data = { name: 'test' };
const rule = 'test';

function onRulesTaskResponse(message, channel) {
  console.log(chalk.green('[✓] Recieved executed rule'));
  const data = JSON.parse(message.content);
  console.log(data);
}

function sendTask(error, { queue }, channel) {
  const correlationId = 'Some random task ID';

  // Listen for rules
  channel.consume(queue, message => onRulesTaskResponse(message, channel), {
    noAck: true,
  });

  // Request rules
  console.log(chalk.blue('[?] Sending rules taks'));
  channel.sendToQueue(
    'rules_queue',
    Buffer.from(JSON.stringify({ rule, data })),
    {
      correlationId,
      replyTo: queue,
    },
  );
}

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    setInterval(() => {
      channel.assertQueue('', { exclusive: true }, (err, queue) =>
        sendTask(err, queue, channel),
      );
    }, 1000);
  });
}

mq.connect('amqp://localhost', handleMqConnection);

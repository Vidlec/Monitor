const mq = require('amqplib/callback_api');
const chalk = require('chalk');

const data = { name: 'test', severity: 6 };
const conn = { gwName: 'testGW' };
const rule = 'test';

function onRulesTaskResponse(message, channel) {
  console.log(chalk.green('[✓] Recieved executed rule'));
  const data = JSON.parse(message.content);
  console.log(data || 'Data to be discarded');
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
    'RULES_TASKS_QUEUE',
    Buffer.from(JSON.stringify({ rule, data, connection: conn })),
    {
      correlationId,
      replyTo: queue,
    },
  );
}

function handleMqConnection(error, connection) {
  connection.createChannel((error, channel) => {
    channel.assertQueue('', { exclusive: true }, (err, queue) =>
      setInterval(() => {
        sendTask(err, queue, channel);
      }, 50),
    );
  });
}

mq.connect('amqp://localhost', handleMqConnection);

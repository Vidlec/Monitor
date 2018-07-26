import chalk from 'chalk';

export function consumeRegistration(queueName, channel, onSuccess) {
  channel.consume(
    queueName,
    message => {
      console.log(chalk.green('[✓] Registered'));
      onSuccess({ channel, message });
      channel.ack(message);
    },
    {
      noAck: false,
    },
  );
}

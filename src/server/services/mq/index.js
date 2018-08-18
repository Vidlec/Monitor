export { replyTo } from './publish';
export { mqRegister, mqConnect, registerServe } from './register';

export function createQueue(channel, queueName = '', exclusive = true) {
  return new Promise((resolve, reject) => {
    channel.assertQueue(queueName, { exclusive }, (err, queue) =>
      resolve(queue),
    );
  });
}

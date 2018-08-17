import { toBuffer } from '@utils/mqData';
import { registrationQueue, rulesTasksQueue } from '@const/queueNames';

export function publishRegistration({ channel, correlationId, replyTo, type }) {
  channel.sendToQueue(registrationQueue, toBuffer(type), {
    correlationId,
    replyTo,
  });
}

export function publishTask({ channel, correlationId, replyTo, data, queue }) {
  channel.sendToQueue(queue, toBuffer(data), {
    correlationId,
    replyTo,
  });
}

export function replyTo({ channel, message, data }) {
  const {
    properties: { replyTo, correlationId },
  } = message;

  /* Send back the reply */
  channel.sendToQueue(replyTo, toBuffer(data), {
    correlationId,
  });
  channel.ack(message);
}

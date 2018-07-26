import { toBuffer } from '../../../../utils/mqData';
import { registrationQueue } from '../../../../const/queueNames';

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

export function publishRegistration({ channel, correlationId, replyTo }) {
  channel.sendToQueue(registrationQueue, toBuffer('rules'), {
    correlationId,
    replyTo,
  });
}

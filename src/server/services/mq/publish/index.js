import { toBuffer } from '@utils/mqData';
import { registrationQueue, rulesTasksQueue } from '@const/queueNames';

export function publishRegistration({ channel, correlationId, replyTo, type }) {
  channel.sendToQueue(registrationQueue, toBuffer(type), {
    correlationId,
    replyTo,
  });
}

export function publishRuleTask({
  channel,
  correlationId,
  replyTo,
  data,
  connection,
}) {
  channel.sendToQueue(rulesTasksQueue, toBuffer({ data, connection }), {
    correlationId,
    replyTo,
  });
}

export function replyTo({ channel, message, data }) {
  const {
    properties: { replyTo, correlationId },
  } = message;
  console.log(replyTo, correlationId);
  /* Send back the reply */
  channel.sendToQueue(replyTo, toBuffer(data), {
    correlationId,
  });
  channel.ack(message);
}

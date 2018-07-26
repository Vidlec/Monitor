import { toBuffer } from '@utils/mqData';
import { registrationQueue } from '@const/queueNames';

export function publishRegistration({ channel, correlationId, replyTo, type }) {
  channel.sendToQueue(registrationQueue, toBuffer(type), {
    correlationId,
    replyTo,
  });
}

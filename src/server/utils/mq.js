import mq from 'amqplib';
import uuid from 'uuid/v4';
import EventEmitter from 'events';

import { toBuffer, toObject } from './mqData';

export default function rabbit(config = {}) {
  const { host, replyQueue } = config;
  return mq
    .connect(host)
    .then(connection => connection.createChannel())
    .then(async channel => {
      // Assert reply queue
      const { queue } = await channel.assertQueue(replyQueue || '', {
        durable: false,
      });

      // Create reply queue consumer
      channel.consume(
        queue,
        message =>
          channel.custom.responseEmitter.emit(
            message.properties.correlationId,
            message.content,
          ),
        { noAck: true },
      );

      // Create event emmiter
      const responseEmitter = new EventEmitter();
      responseEmitter.setMaxListeners(0);

      // Attach it to channel object to be used in task handler
      channel.custom = {
        responseEmitter,
        replyQueue: queue,
      };

      return channel;
    });
}

/**
 * This function is used when expecting response
 * It returns promise which resolves when replyQueue recieves reply
 * with proper corelationId
 */
export function request({ channel, queue, data }) {
  return new Promise((resolve, reject) => {
    // Create unique ID for each request
    // So we can mach it with the response later
    const correlationId = uuid();

    const {
      custom: { responseEmitter, replyQueue },
    } = channel;

    // Listen for response event from replyQueue consumer
    responseEmitter.once(correlationId, content => resolve(toObject(content)));

    // Send the request
    channel.sendToQueue(queue, toBuffer(data), {
      correlationId,
      replyTo: replyQueue,
    });
  });
}

/**
 * This function is used when not expecting response
 */
export function publish({ channel, queue, data }) {
  channel.sendToQueue(queue, toBuffer(data));
}

/**
 * Used when registering to main server
 * Returns whatever result of registration is
 */
export function register({ channel, type }) {
  return new Promise((resolve, reject) => {
    console.log('Registering');
    request({ channel, queue: 'REGISTRATION_QUEUE', data: type }).then(
      result => {
        console.log('Registered');
        resolve(result);
      },
    );
  });
}

/**
 * Reply to request
 */
export function reply({ channel, message, data }) {
  const {
    properties: { replyTo, correlationId },
  } = message;

  /* Send back the reply */
  channel.sendToQueue(replyTo, toBuffer(data), {
    correlationId,
  });
  channel.ack(message);
}

/**
 * Consumes queue and returns message
 */
export function consume({ channel, queue, durable }, onMessage) {
  // Check if queue exists or ccreate it
  channel.assertQueue(queue, { durable }).then(() => {
    console.log('[...] Consuming queue: ', queue);
    channel.consume(queue, message =>
      onMessage({ message, data: toObject(message.content) }),
    );
  });
}

/**
 * Remote procedure call function
 * Consumes queue and uppon message recieved calls supplied function
 * This function must be a promise which resolves with data
 * Then replies to request sender
 */
export async function rpc(args, task) {
  const { channel } = args;

  consume(args, async ({ message, data }) => {
    const result = await task({ content: data });
    reply({ channel, message, data: result });
  });
}

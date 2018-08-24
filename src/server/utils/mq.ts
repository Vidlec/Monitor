import * as R from 'ramda';
import invariant from 'invariant';
import mq, { Channel, Message, Options } from 'amqplib';
import uuid from 'uuid/v4';
import * as EventEmitter from 'events';

import { getInfo } from '@utils';

import { toBuffer, toObject } from './mqData';

/**
 * Sends a data into the given queue.
 */
export const publish = R.curry(
  (channel, queue: string, data: any, options: Options.Publish) => {
    channel.assertQueue(queue);
    channel.sendToQueue(queue, toBuffer(data), options);
  },
);

type RabbitConfig = {
  host: string;
};

export async function rabbit(config: RabbitConfig) {
  const { host } = config;

  invariant(
    host,
    `Failed to create a RabbitMQ connection: Expected to have a "host" property specified, but got: ${host}`,
  );

  const connection = await mq.connect(host);
  const channel = await connection.createChannel();

  // Assert reply queue
  const { queue: replyQueue } = await channel.assertQueue('', {
    durable: false,
    exclusive: true,
    autoDelete: true,
  });

  // Create reply queue consumer
  channel.consume(
    replyQueue,
    (message: Message) =>
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
    replyQueue,
  };

  return { connection, channel };
}

/**
 * This function is used when expecting response
 * It returns promise which resolves when replyQueue recieves reply
 * with proper corelationId
 */
export const request = ({
  channel,
  queue,
  data,
}: {
  channel: Channel;
  queue: string;
  data: any;
}) => {
  return new Promise((resolve, reject) => {
    // Create unique ID for each request
    // So we can mach it with the response later
    const correlationId = uuid();

    const {
      custom: { responseEmitter, replyQueue },
    } = channel;

    // Send the request
    publish(channel, queue, data, {
      correlationId,
      replyTo: replyQueue,
    });

    // Listen for response event from replyQueue consumer
    responseEmitter.once(correlationId, content => resolve(toObject(content)));
  });
};

/**
 * Used when registering to main server
 * Returns whatever result of registration is
 */
export const register = ({
  channel,
  type,
}: {
  channel: Channel;
  type: string;
}) => {
  return new Promise((resolve, reject) => {
    console.log('Registering');
    request({
      channel,
      queue: 'REGISTRATION_QUEUE',
      data: {
        type,
        info: getInfo(),
      },
    }).then(result => {
      console.log('Registered');
      resolve(result);
    });
  });
};

/**
 * Reply to request
 */
export function reply({
  channel,
  message,
  data,
}: {
  channel: Channel;
  message: Message;
  data: any;
}) {
  const {
    properties: { replyTo, correlationId },
  } = message;

  /* Send back the reply */
  publish(replyTo, toBuffer(data), { correlationId });
  channel.ack(message);
}

type ConsumerBinding = {
  bindTo: string;
};

type OnConsumeSuccess = (
  {
    message,
    data,
  }: {
    message: Message;
    data: any;
  },
) => any;

/**
 * Consumes queue and returns message
 */
export function consume(
  {
    channel,
    queue,
    durable = false,
    autoDelete = false,
    noAck = false,
    binding,
  }: {
    channel: Channel;
    queue: string;
    durable?: boolean;
    autoDelete?: boolean;
    noAck?: boolean;
    binding: ConsumerBinding;
  },
  onSuccess: OnConsumeSuccess,
) {
  // Check if queue exists or ccreate it
  channel
    .assertQueue(queue, { durable, autoDelete })
    .then(({ queue: queueName }) => {
      console.log(queueName);
      console.log('[...] Consuming queue: ', queueName);

      const { bindTo } = binding;

      if (bindTo) {
        channel.bindQueue(queueName, bindTo, '');
      }

      channel.consume(
        queueName,
        (message: Message) =>
          onSuccess({
            message,
            data: toObject(message.content),
          }),
        { noAck },
      );
    });
}

/**
 * Remote procedure call function
 * Consumes queue and uppon message recieved calls supplied function
 * Then replies to request sender
 */
export function rpc(args, task) {
  const { channel } = args;

  consume(args, async ({ message, data }) => {
    const result = await task({ content: data });
    reply({ channel, message, data: result });
  });
}

/**
 * Creates fanout type exchange
 * Publishes message to all queues binded to that exchange
 */
export async function broadcast({
  channel,
  exchange,
  data,
  durable = false,
}: {
  channel: Channel;
  exchange: string;
  data: any;
  durable: boolean;
}) {
  channel.assertExchange(exchange, 'fanout', { durable });
  channel.publish(exchange, '', toBuffer(data));
}

/**
 * Subscribes to specific exchange
 * Binds anonymous queue to it and consumes all messages
 */
export function subscribe(
  {
    channel,
    exchange,
    durable,
  }: {
    channel: any;
    exchange: string;
    durable?: boolean;
  },
  onSuccess: OnConsumeSuccess,
) {
  channel.assertExchange(exchange, 'fanout', { durable });

  const binding: ConsumerBinding = {
    bindTo: exchange,
  };

  consume(
    {
      channel,
      queue: '',
      binding,
      durable,
      autoDelete: true,
      noAck: true,
    },
    onSuccess,
  );
}

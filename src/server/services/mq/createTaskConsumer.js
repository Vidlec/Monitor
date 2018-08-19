import EventEmitter from 'events';

export default (channel, replyQueue) => {
  channel.responseEmitter = new EventEmitter();
  channel.responseEmitter.setMaxListeners(0);
  channel.assertQueue(replyQueue, { durable: false });

  channel.consume(
    replyQueue,
    message =>
      channel.responseEmitter.emit(
        message.properties.correlationId,
        message.content,
      ),
    { noAck: true },
  );
  return channel;
};

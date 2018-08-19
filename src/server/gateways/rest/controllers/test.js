import { rulesTasksQueue, databaseQueue } from '@const/queueNames';
import dbTypes from '@const/databaseTypes';

import sendTask from '../../../services/mq/sendTask';

export const post = (req, res, next) => {
  const { body: data } = req;
  const { channel, connection, replyTo } = res.locals;

  sendTask(channel, { data, connection }, rulesTasksQueue, replyTo)
    .then(data =>
      sendTask(
        channel,
        { type: dbTypes.ALERT_ADD, data },
        databaseQueue,
        replyTo,
      ),
    )
    .then(result => res.json(result))
    .catch(next);
};

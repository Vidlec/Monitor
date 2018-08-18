import { rulesTasksQueue, databaseQueue } from '@const/queueNames';
import dbTypes from '@const/databaseTypes';

import sendTask from '../../../services/mq/sendTask';

export const post = (req, res, next) => {
  const { body: data } = req;
  const { channel, replyQueue, connection } = res.locals;

  sendTask(channel, replyQueue, { data, connection }, rulesTasksQueue)
    .then(data =>
      sendTask(
        channel,
        replyQueue,
        { type: dbTypes.ALERT_ADD, data },
        databaseQueue,
      ),
    )
    .then(result => res.json(result))
    .catch(next);
};

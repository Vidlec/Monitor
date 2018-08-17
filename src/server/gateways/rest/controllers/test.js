import { toObject } from '@utils/mqData';
import { rulesTasksQueue } from '@const/queueNames';

import sendTask from '../../../services/mq/sendTask';

export const post = (req, res, next) => {
  const { body: data } = req;
  const { channel, replyQueue, connection } = res.locals;
  console.log(connection);

  sendTask(channel, replyQueue, { data, connection }, rulesTasksQueue)
    .then(result => {
      return res.json(toObject(result));
    })
    .catch(next);
};

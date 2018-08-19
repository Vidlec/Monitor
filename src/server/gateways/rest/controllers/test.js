import { rulesTasksQueue, databaseQueue } from '@const/queueNames';
import dbTypes from '@const/databaseTypes';
import { request } from '@utils/mq';

export const post = (req, res, next) => {
  const { body: data } = req;
  const { channel, connection } = res.locals;

  request({ channel, queue: rulesTasksQueue, data: { data, connection } })
    .then(data =>
      request({
        channel,
        queue: databaseQueue,
        data: { type: dbTypes.ALERT_ADD, data },
      }),
    )
    .then(result => res.json(result))
    .catch(next);
};

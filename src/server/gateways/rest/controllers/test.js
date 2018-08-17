import { toObject } from '@utils/mqData';
import sendRulesTask from '../../../services/mq/sendRulesTask';

export const post = (req, res, next) => {
  const { body: data } = req;
  const { channel, replyQueue, gwName } = res.locals;

  sendRulesTask(channel, replyQueue, data, { gwName }).then(console.log);
  sendRulesTask(channel, replyQueue, data, { gwName })
    .then(result => res.json(toObject(result)))
    .catch(next);
};

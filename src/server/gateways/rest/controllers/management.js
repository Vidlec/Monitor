import { request } from '@utils';

export const rulesReload = (_, res, next) => {
  const { channel } = res.locals;

  request({
    channel,
    queue: 'MANAGEMENT_QUEUE',
    data: { type: 'RULES_RELOAD' },
  })
    .then(result => res.json(result))
    .catch(next);
};

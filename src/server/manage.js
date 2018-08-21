import { rulesUpdateExchange } from '@const/exchangesNames';
import { getRules, broadcast } from '@utils';

export default async ({ channel, data, config }) => {
  switch (data.type) {
    case 'RULES_RELOAD': {
      const rules = await getRules(config.rulesFolder);
      broadcast({ channel, exchange: rulesUpdateExchange, data: rules });
      return 'ok';
    }

    default:
      return {};
  }
};

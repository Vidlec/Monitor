import { rulesTasksQueue } from '@const/queueNames';
import { rabbit, register, rpc } from '@utils';
import types from '@const/registrationTypes';

import { handleRuleTask, handleRulesUpdate } from './mq/tasksHandlers';

import rulesStore from './mq/rules';

const rabbitConfig = {
  host: 'amqp://localhost',
};

async function init() {
  // Connect to mq and register with main server
  const { channel } = await rabbit(rabbitConfig);

  const rules = await register({ channel, type: types.rules });

  handleRulesUpdate(rules, rulesStore);

  // Set max tasks for this worker
  channel.prefetch(10);
  rpc({ channel, queue: rulesTasksQueue, durable: false }, ({ content }) =>
    handleRuleTask({ content, rulesStore }),
  );
}

init();

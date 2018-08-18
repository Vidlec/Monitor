import { mqRegister } from '@services/mq';

import { consumeRuleTasks, consumeRulesUpdate } from './mq/consume';
import { handleRulesUpdate } from './mq/tasksHandlers';
import rulesStore from './mq/rules';

function onRegistrationSuccess({ message, channel }) {
  handleRulesUpdate(message, channel, rulesStore);

  consumeRuleTasks({ channel, rulesStore });
  consumeRulesUpdate({ channel, rulesStore });
  // Any aditional queue consuming goes here
}

mqRegister('rules', onRegistrationSuccess);

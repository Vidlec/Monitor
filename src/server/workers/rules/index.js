import { mqInit } from '@services/mq';
import { consumeRuleTasks } from './mq/consume';

function onRegistrationSuccess({ message, channel }) {
  consumeRuleTasks({ message, channel });
  // Any aditional queue consuming goes here
}

mqInit('rules', onRegistrationSuccess);

import { mqRegister } from '@services/mq';
import { consumeDatabaseTasks } from './mq/consume';
import createDbHandler from './dbHandler';

async function onRegistrationSuccess({ message, channel }) {
  const dbHandler = await createDbHandler('mongo'); // This will come from the registration
  consumeDatabaseTasks({ message, channel, dbHandler });
}

mqRegister('database', onRegistrationSuccess);

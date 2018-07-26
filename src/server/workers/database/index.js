import { mqInit } from '@services/mq';
import { consumeDatabaseTasks } from './mq/consume';
import createDbHandler from './dbHandler';

async function onRegistrationSuccess({ message, channel }) {
  const dbHandler = await createDbHandler('mongo'); // This will come fromthe registration
  consumeDatabaseTasks({ message, channel, dbHandler });
}

mqInit('database', onRegistrationSuccess);

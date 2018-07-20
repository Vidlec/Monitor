import { connect } from './dbHandler';
import { listenForTasks } from './mq';

async function init() {
  /* Several things need to be done:
     0: TODO: Get / Read Config
     1: Connect to respective database
     2: Connect to MQ
  */

  // Connect to DB
  await connect();
  // Connect to MQ
  listenForTasks();
}

init();

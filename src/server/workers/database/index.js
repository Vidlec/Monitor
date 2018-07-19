import mongoose from 'mongoose';
import actions from './const/actions';

const name = 'mongo';

function handleDatabaseRequest(type, data, connector) {
  switch (type) {
    case actions.ALERT_ADD:
      connector.deduplicateAlert(data);
    default:
      break;
  }
}

async function init() {
  /* Several things need to be done:
     0: Read config
     1: Connect to mongo
     2: Connect to MQ
     3: Start express server and listen for requests
  */

  if (name === 'mongo') mongoose.connect('mongodb://127.0.0.1/test');

  const connector = await import(`./connectors/${name}`);
  const alert = {
    indetifier: 'someAlertsdsds',
    message: 'testing',
  };
  handleDatabaseRequest(actions.ALERT_ADD, alert, connector);
}

init();

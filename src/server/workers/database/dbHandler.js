import mongoose from 'mongoose';
import actions from '../../const/databaseTypes';

const name = 'mongo';
let connector;

export async function connect() {
  connector = await import(`@services/connectors/${name}`);
  if (name === 'mongo') mongoose.connect('mongodb://127.0.0.1/test');
}

export function handleDatabaseTask({ type, data }) {
  switch (type) {
    case actions.ALERT_ADD: {
      return connector.deduplicateAlert(data);
    }
    default:
      break;
  }
}

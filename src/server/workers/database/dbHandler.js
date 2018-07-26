import mongoose from 'mongoose';
import * as connectors from '@services/connectors';
import actions from '../../const/databaseTypes';

export default async function createDbHandler(name) {
  const connector = connectors[name];

  if (name === 'mongo') {
    await mongoose.connect('mongodb://127.0.0.1/test');
  }

  return args => {
    const { type } = args;

    switch (type) {
      case actions.ALERT_ADD: {
        return connector.deduplicateAlert(args);
      }

      default:
        break;
    }
  };
}

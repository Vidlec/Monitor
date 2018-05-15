import { Alert } from '@models';

export const getAlert = _id => {
  return Alert.findById(_id).exec();
};

export const getAlerts = params => {
  return Alert.find(params).exec();
};

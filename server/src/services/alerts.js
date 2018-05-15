import { Alert } from '@models';

export const getAlert = param => {
  return Alert.findOne(param).exec();
};

export const getAlerts = params => {
  return Alert.find(params).exec();
};

export const saveAlert = params => {
  const alert = new Alert(params);
  return alert.save();
};

export const updateAlert = ({ alert, props }) => {
  const newAlert = Object.assign(alert, props);
  return Alert.update({ identifier: props.identifier }, newAlert);
};

export const deduplicateAlert = props => {
  return getAlert({ identifier: props.identifier }).then(alert => {
    if (alert) {
      props.count = alert.count + 1;
      return updateAlert({ alert, props });
    }
    return saveAlert(props);
  });
};

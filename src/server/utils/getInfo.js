import ip from 'ip';
import uuid from 'uuid/v4';

export default () => {
  return {
    platform: process.platform,
    ip: ip.address(),
    id: uuid(),
  };
};

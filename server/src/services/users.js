import { User } from '@models';

export const getUser = param => {
  return User.findOne(param).exec();
};

export const getUsers = params => {
  return User.find(params).exec();
};

export const addUser = params => {
  const user = new User(params);
  return user.save();
};

import { Comment } from '@models';

export const getComment = param => {
  return Comment.findOne(param).exec();
};

export const getComments = params => {
  return Comment.find(params).exec();
};

export const addComment = params => {
  const comment = new Comment(params);
  return comment.save();
};

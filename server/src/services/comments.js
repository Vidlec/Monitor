import { Comment } from '@models';

export const getComment = param => {
  return Comment.findOne(param)
    .populate('user', '-comments')
    .populate('alert', '-comments')
    .exec();
};

export const getComments = params => {
  return Comment.find(params)
    .populate('user', '-comments')
    .populate('alert', '-comments')
    .exec();
};

export const addComment = params => {
  const comment = new Comment(params);
  return comment.save();
};

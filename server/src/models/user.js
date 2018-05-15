import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  userName: String,
  password: String,
  contact: {
    firstName: String,
    lastName: String,
  },
});

export default mongoose.model('User', schema);

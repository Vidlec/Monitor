import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  date: Date,
});

export default mongoose.model('Comment', schema);

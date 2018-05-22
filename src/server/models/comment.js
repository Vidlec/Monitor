import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  alert: { type: Schema.Types.ObjectId, ref: 'Alert' },
  message: String,
  date: { type: Date, default: new Date() },
});

export default mongoose.model('Comment', schema);

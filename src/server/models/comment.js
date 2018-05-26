import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  userId: { type: Schema.Types.ObjectId },
  alertId: { type: Schema.Types.ObjectId },
  message: String,
  date: { type: Date, default: new Date() },
});

export default mongoose.model('Comment', schema);

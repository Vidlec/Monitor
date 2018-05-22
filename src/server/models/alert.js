import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  priority: Number,
  count: { type: Number, default: 1 },
  identifier: String,
  message: String,
  errorValue: String,
  host: String,
  hostip: String,
  country: String,
  type: String,
  tool: String,
  key: String,
  bsmid: String,
  operator: { type: Schema.Types.ObjectId, ref: 'User' },
  firstOccurence: { type: Date, default: new Date() },
  lastOccurence: { type: Date, default: new Date() },
  fetched: String,
  rules: String,
  status: String,
  acknowledged: {
    status: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    date: Date,
  },
  groups: [String],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export default mongoose.model('Alert', schema);

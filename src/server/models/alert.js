import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  priority: Number,
  count: { type: Number, default: 1 },
  identifier: String,
  message: String,
  host: String,
  hostip: String,
  country: String,
  type: String,
  tool: String,
  key: String,
  firstOccurence: { type: Date, default: new Date() },
  lastOccurence: { type: Date, default: new Date() },
  rules: String,
  status: String,
  isAcknowledged: { type: Boolean, default: false },
  acknowledgedById: Schema.Types.ObjectId,
  groups: [String],
});

export default mongoose.model('Alert', schema);

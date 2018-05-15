import mongoose from 'mongoose';

export const schema = mongoose.Schema({
  priority: Number,
  count: Number,
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
  operator: String,
  firstOccurence: Date,
  lastOccurence: Date,
  fetched: String,
  rules: String,
  status: String,
  acknowledged: {
    status: Boolean,
    by: String,
    date: Date,
  },
  groups: [String],
  comments: [
    {
      user: String,
      message: String,
      date: Date,
    },
  ],
  tickets: [
    {
      number: Number,
      status: String,
    },
  ],
});

export default mongoose.model('Alert', schema);

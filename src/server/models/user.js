import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = Schema({
  userName: String,
  password: { type: String, select: false },
  firstName: String,
  lastName: String,
});

export default mongoose.model('User', schema);

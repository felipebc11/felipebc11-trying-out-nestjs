import * as mongoose from 'mongoose';

export const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  friend: {
    type: String,
    required: false
  }
});
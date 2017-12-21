const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, "A message needs a room"]
  },
  message: String,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Message', MessageSchema);

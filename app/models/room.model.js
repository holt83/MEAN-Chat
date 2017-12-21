const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  title: {
    type: String,
    required: [true, "A chat room needs a title"]
  },
  description: String,
  created: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Room', RoomSchema);

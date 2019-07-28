const mongoose = require('mongoose')
const uuid4 = require("uuid/v4")
mongoose.Promise = global.Promise

const logsSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuid4()
    }
  },
  uid: {
    type: String,
    required: true
  },
  logText: {
    type: String,
    minlength: [1, "Invalid log length"],
    maxlength: [200, "Invalid log length"],
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  isStarred: {
    type: Number,
    default: 0
  },
  isDeleted: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Log', logsSchema)
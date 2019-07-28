const mongoose = require('mongoose')
const uuid4 = require("uuid/v4")
mongoose.Promise = global.Promise

const UsersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuid4()
    }
  },
  email: {
    type: String,
  },
  password: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now()
  },
  isBanned: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('User', UsersSchema)
const mongoose = require('mongoose')
const Log = require('./Model')

exports.addLog = (req, res) => {
  const uid = req.userId
  let log = new Log

  log.logText = req.body.logText
  log.isTodo = req.body.isTodo
  log.uid = req.userId
  log.save((err, log) => {
    if (err) throw new Error(err)

    res
      .status(200)
      .json(log)
  })
}

exports.getLogs = (req, res) => {
  Log.find({
    uid: req.userId
  })
  .sort('-created')
  .exec((err, logs) => {
    if (err) throw new Error(err)

    res
      .status(200)
      .json(logs)
  })
}

exports.getLog = (req, res) => {
  const logId = req.params.logId

  Log.findOne({
    _id: logId
  }, (err, log) => {
    if (err) throw new Error(err)

    res
      .status(200)
      .json(log)
  })
}

exports.deleteLog = (req, res) => {
  const logId = req.params.logId

  Log.remove({
    _id: logId
  }, (err, log) => {
    if (err) throw new Error(err)

    res
      .status(200)
  })
}
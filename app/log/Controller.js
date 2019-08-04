const mongoose = require('mongoose')
const Log = require('./Model')

exports.addLog = (req, res) => {
  const uid = req.userId
  let log = new Log

  log.logText = req.body.logText
  log.todo.isTodo = req.body.isTodo

  console.log(req.body)

  log.uid = req.userId
  log.save((err, log) => {
    if (err) throw new Error(err)

    res
      .status(200)
      .json(log)
  })
}

exports.getLogs = (req, res) => {

  Log.aggregate([
    {
      $sort: {
        created: -1
      }
    },
    {
      "$project" :{
       _id : 0,
       "datePartDay" : {"$concat" : [
            {"$substr" : [{"$year" : "$created"}, 0, 4]}, ",",
            {"$substr" : [{"$month" : "$created"}, 0, 2]}, ",",
           {"$substr" : [{"$dayOfMonth" : "$created"}, 0, 2]} 
           
           
        ] },
          "logText" : 1,
          "created" : 1,
          "todo": 1
      }
    },
    { 
      $group: { 
        _id: "$datePartDay",
        logs: { $push: "$$ROOT" }
      },
    },
    {
      $sort: {
        _id: -1
      }
    }
    ]).exec((err, logs) => {
    if (err) throw new Error(err)

    res
      .status(200)
      .json(logs)
  })

  // Log.find({
  //   uid: req.userId
  // })
  // .sort('-created')
  // .exec((err, logs) => {
  //   if (err) throw new Error(err)

  //   res
  //     .status(200)
  //     .json(logs)
  // })
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
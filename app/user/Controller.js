const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./Model')

// Settings
const SALT_ROUNDS = 10;
const SECRET = '#Hp+3bH}3B9$[B_'

exports.addUser = (req, res) => {
  const user = new User

  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  user.email = req.body.email
  user.password = passwordHash
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName

  user.save((err, user) => {
    if (err) throw new Error(err)

    const token = jwt.sign({
      id: user._id
    }, SECRET, {
      expiresIn: '24h',
      algorithm: 'HS256'
    })

    res
      .status(200)
      .json({
        id: user._id,
        email: user.email,
        token: token
      })
  })
}

exports.login = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({
    email: email
  }, (err, user) => {
    if (err) throw new Error(err)

    if (bcrypt.compareSync(password, user.password)) {

      // Generate the token
      const token = jwt.sign({
        id: user._id
      }, SECRET, {
        expiresIn: '24h',
        algorithm: 'HS256'
      })

      res
        .status(200)
        .json({
          id: user._id,
          email: user.email,
          token: token
        })
    } else {
      res
        .status(401)
        .json({
          message: "Wrong email or password"
        })
    }
  })
}
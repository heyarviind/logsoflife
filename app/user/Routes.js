const express = require('express');
const router = express.Router();
const {
  addUser,
  login
} = require('./Controller')

// router.get('/users/', getUsers)
// router.get('/user/:userId', getUser)
// router.post('/user/add', addUser)
// router.delete('/user/:userId', deleteUser)

router.post('/user/', addUser)
router.post('/login/', login)

module.exports = router;
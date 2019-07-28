const express = require('express');
const router = express.Router();
const {
  verifyToken
} = require('../helper')

const {
  addLog,
  deleteLog,
  getLogs,
  getLog
} = require('./Controller')

router.get('/logs/', verifyToken, getLogs)
router.get('/log/:logId', verifyToken, getLog)
router.post('/log/', verifyToken, addLog)
router.delete('/log/:logId', verifyToken, deleteLog)

module.exports = router;
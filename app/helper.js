const jwt = require('jsonwebtoken')
const SECRET = '#Hp+3bH}3B9$[B_'

exports.verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    var token = String(req.headers.authorization).split(' ');

    if (token[0] === 'X-Token') {
      jwt.verify(token[1], SECRET, function (err, decoded) {
        if (err) {
          console.log(err)
          return res.status(401).send({
            auth: false,
            message: 'Failed to authenticate token',
            error: err
          });
        }

        // if everything works, pass the decoded token and
        // go to the next task
        req.userId = decoded.id;
        next();
      });
    } else {
      return res.status(401).send({
        auth: false,
        message: 'Invalid token'
      });
    }
  } else {
    return res.status(403).send({
      auth: false,
      message: 'No token provided'
    });
  }
}
const jwt = require('jsonwebtoken')
exports.verify = (ctxHeader) => {
  let token = ''
  let userId = -1
  if (ctxHeader.authorization) {
    token = ctxHeader.authorization.substring(7)
  } else {
    userId = -1
  }
  jwt.verify(token, 'my_token', (err, authData) => {
    if (!err) {
      userId = authData.id
    } else {
      userId = -1
    }
  })
  return userId
}
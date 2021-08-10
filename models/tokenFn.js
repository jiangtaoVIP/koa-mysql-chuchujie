const jwt = require('jsonwebtoken')
exports.verify = (ctxHeader) => {
  let token = ''
  let userId = 0
  if (ctxHeader.authorization) {
    token = ctxHeader.authorization.substring(7)
  } else {
    userId = 0
  }
  jwt.verify(token, 'user_token', (err, authData) => {
    if (!err) {
      userId = authData.id
    } else {
      userId = 0
    }
  })
  return userId
}
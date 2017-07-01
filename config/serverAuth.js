const
  jwt = require('jsonwebtoken'),
  jwtSecret = process.env.JWT_SECRET

const serverAuth = {
  createToken: function(data){
    return jwt.sign(data, jwtSecret, {expiresIn: '5 days'})
  },
  verifyToken: function(token){
    return jwt.verify(token, jwtSecret)
  },
  authorize: function(req, res, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token) res.status(403).json({success: false, message: 'Token is either invalid or not present'})
    const decoded = serverAuth.verifyToken(token)
    if(decoded) req.decoded = decoded
    next()
  }
}

module.exports = serverAuth

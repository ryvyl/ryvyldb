const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: ({type: String, select: false})
  })

  userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  userSchema.methods.validPassword = function(password){
    if(!password) return false
    return bcrypt.compareSync(password, this.password)
  }

  userSchema.pre('save', function(next){
    const user = this
    if(!user.isModified('password')) return next()
    user.password = user.generateHash(user.password)
    next()
  })

  module.exports = mongoose.model('User', userSchema)

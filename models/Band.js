const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  bandSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    password: ({type: String, select: false})
  })

  bandSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  }

  bandSchema.methods.validPassword = function(password){
    if(!password) return false
    return bcrypt.compareSync(password, this.password)
  }

  bandSchema.pre('save', function(next){
    const band = this
    if(!band.isModified('password')) return next()
    band.password = band.generateHash(band.password)
    next()
  })

  module.exports = mongoose.model('Band', bandSchema)

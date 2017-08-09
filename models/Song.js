const
  mongoose = require('mongoose'),
  songSchema = new mongoose.Schema({
    album: {type: mongoose.Schema.Types.ObjectId, ref:'Album'},
    title: String,
    song: String,
    plays: Number
  })

  module.exports = mongoose.model('Song', songSchema)

const
  mongoose = require('mongoose'),
  albumSchema = new mongoose.Schema({
    band: {type: mongoose.Schema.Types.ObjectId, ref: 'Band'},
    title: String,
    image: String,
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
  })

module.exports = mongoose.model('Album', albumSchema)

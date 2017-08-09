const
  Band = require('../models/Band.js'),
  serverAuth = require('../config/serverAuth.js')

module.exports = {
  index,
  show,
  create,
  update,
  destroy
}

function index(req, res){
  Band.find({}, '-__v', (err, bands)=>{
    if(err) return console.log(err);
    res.json(bands)
  })
}

function show(req, res){
  Band.findById(req.params.id).populate('albums').exec((err, band)=>{
    if(err) return console.log(band);
    res.json(band)
  })
}

function create(req, res){
  Band.create(req.body, (err, band)=>{
    if(err) return console.log(err);
    const bandData = band.toObject()
    delete bandData.password
    const token = serverAuth.createToken(bandData)
    res.json({success: true, message: 'New band created', band, token})
  })
}

function update(req, res){
  Band.findById(req.params.id, (err, band)=>{
    if(err) return console.log(err);
    Object.assign(band, req.body)
    band.save((err)=>{
      res.json({success: true, message: 'Band info updated', band})
    })
  })
}

function destroy(req, res){
  Band.findByIdAndRemove(req.params.id, (err, band)=>{
    if(err) return console.log(err);
    res.json({success: true, message: 'Sorry to see you go'})
  })
}

const
  express = require('express'),
  bandsRouter = new express.Router(),
  bandsCtrl = require('../controllers/bands.js'),
  Band = require('../models/Band.js'),
  serverAuth = require('../config/serverAuth.js')

  bandsRouter.post('/login', (req, res)=>{
    Band.findOne({email: req.body.email}, '+password', (err, band)=>{

      if(!band || !band.validPassword(req.body.password)){
        return res.status(403).json({message: 'Imvalid credentials'})
      }

      if(band && band.validPassword(req.body.password)){
        const bandData = band.toObject()
        delete band.password

        const token = serverAuth.createToken(bandData)
        res.json({token})
      }
    })
  })

  bandsRouter.route('/')
    .get(bandsCtrl.index)
    .post(bandsCtrl.create)

  bandsRouter.use(serverAuth.authorize)

  bandsRouter.route('/:id')
    .get(bandsCtrl.show)
    .patch(bandsCtrl.update)
    .delete(bandsCtrl.destroy)

  module.exports = bandsRouter

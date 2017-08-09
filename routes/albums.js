const
  express = require('express'),
  Album = require('../models/Album.js'),
  authorize = require('../config/serverAuth').authorize,
  albumsRouter = new express.Router()
  songsRoutes = require('./songs.js')


albumsRouter.use(authorize)

albumsRouter.route('/')
  .get((req, res)=>{
    Album.find({band: req.decoded._id}, (err, albums)=>{
      if(err) return console.log(err);
      res.json(albums)
    })
  })
  .post((req, res)=>{
    const newAlbum = new Album(req.body)
    newAlbum.band = req.decoded
    newAlbum.save((err, album)=>{
      if(err) return console.log(err);
      res.json({success: true, message: 'New album created', album})
    })
  })

albumsRouter.route('/:id')
  .get((req, res)=>{
    Album.findById(req.params.id).populate('songs').exec((err, album)=>{
      if(err) return console.log(err);
      res.json(album)
    })
  })
  .patch((req, res)=>{
    Album.findById(req,params.id, (err, album)=>{
      const albumData = req.body
      albumData.save((err, album)=>{
        if(err) return console.log(err);
        res.json({success: true, message: 'Album info updated', album})
      })
    })
  })
  .delete((req, res)=>{
    Album.findByIdAndRemove(req.params.id, (err, album)=>{
      if(err) return console.log(err);
      res.json({success: true, message: 'Album removed'})
    })
  })

albumsRouter.use('/:id/songs', songsRoutes)

module.exports = albumsRouter

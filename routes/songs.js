const
  express = require('express'),
  Album = require('../models/Album.js'),
  Song = require('../models/Song.js'),
  authorize = require('../config/serverAuth').authorize,
  songsRouter = new express.Router({mergeParams: true})

songsRouter.use(authorize)
songsRouter.get('/:songId', (req, res)=>{
  res.json(req.params)
})

songsRouter.route('/')
  .get((req, res)=>{
    Song.find({band: req.decoded._id}, (err, songs)=>{
      if(err) return console.log(err);
      res.json(songs)
    })
  })
  .post((req, res)=>{
    Album.findById(req.params.id, (err, album)=>{
      const newSong = new Song(req.body)
      newSong.band = req.decoded
      newSong.album = album
      newSong.save((err, song)=>{
        if(err) return console.log(err);
        album.songs.push(song)
        album.save((err, album)=>{
          if(err) return console.log(err);
          res.json({success: true, message: 'New song added.', song})
        })
      })
    })
  })

  songsRouter.route('/:songId')
    .get((req, res)=>{
      Song.findById(req.params.songId, (err, song)=>{
        if(err) return console.log(err);
        res.json(song)
      })
    })
    .patch((req, res)=>{
      Song.findById(req.params.songId, (err, song)=>{

      })
    })
    .delete((req, res)=>{
      Song.findByIdAndRemove(req.params.songId, (err, song)=>{
        if(err) return console.log(err);
        res.json({success: true, message: 'Song removed', song})
      })
    })

  module.exports = songsRouter

const
  express = require('express'),
  app = express(),
  dotenv = require('dotenv').load({silent: true}),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  mongoURL = process.env.MONGO_URL,
  PORT = process.env.PORT


mongoose.connect(mongoURL, (err)=>{
  console.log(err || 'Connect to mongo database');
})

app.use(logger('dev'))

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends:false}))

app.get('/', (req, res)=>{
  res.json({message: 'server root'})
})

app.listen(PORT, (err)=>{
  console.log(err || `Server running on port ${PORT}`);
})

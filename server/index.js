const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');
const multer = require('multer');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const connectDB = require('./config/db');

require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();

// Connect to mongoDB database
connectDB();

app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./server/public/files")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage});

app.post('/uploadFile', upload.single('attachment'), (req, res) => {
  //console.log(req.body);
  //console.log(req.file);
  const file = req.file.filename;
  res.send(file);
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}`));

process.setMaxListeners(0);
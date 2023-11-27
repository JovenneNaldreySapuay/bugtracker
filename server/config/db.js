const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'production') {  
    const conn = await mongoose.connect( keys.mongoDB );
  }

  const conn = await mongoose.connect( keys.mongoDBLocal );

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

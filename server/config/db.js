const mongoose = require('mongoose');

// Note: login to mongodb.com and view all collections under cluster name ClusterTestMongoDB. 
// The db name is "test"
// change below to MONGO_URI_LIVE when going live
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        dbName: 'boltcar',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`\ud83d\udd0d MongoDB Connected: ${conn.connection.host}`);
    console.log(`\ud83d\udce6 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://rishabh2155be22_db_user:IhrDhNsbeNkfhoRX@cluster0.vy1drz6.mongodb.net/?appName=Cluster0',
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

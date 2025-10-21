const mongoose = require('mongoose');

async function connectDB() {
  try {
    // await mongoose.connect(
    //   " mongodb+srv://karnkrishnesh49_db_user:F76lUMHElBCrsLOO@cluster0.tuuvd9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    // );
   
   await mongoose.connect("mongodb://127.0.0.1:27017/CompanyManagement");
    console.log("MongoDB connected ");
  } catch (err) {
    console.log("MongoDB connection failed ", err);
  }
}

module.exports = connectDB;
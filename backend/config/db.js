const mongoose = require("mongoose");

const databaseURI = "mongodb://localhost:27017/courseSellingApp";

async function connectDB() {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
}

module.exports = connectDB;

import mongoose from "mongoose";

const databaseURI = "mongodb://localhost:27017/courseSellingApp";

async function connectDB() {
  try {
    await mongoose.connect(databaseURI, {});
  } catch (error) {
    console.error("Error in connecting to the database:", error);
  }
}

export default connectDB;

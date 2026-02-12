import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    console.log('URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection failed:", error.message);
    console.error("Error details:", error);
    process.exit(1);
  }
};

export default connectDB;
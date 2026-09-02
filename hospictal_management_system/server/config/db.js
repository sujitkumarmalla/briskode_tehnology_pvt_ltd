import mongoose from "mongoose";

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  

  try {
    const conn = await mongoose.connect(primaryUri);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB Connection Error (${primaryUri}): ${error.message}`);
   
  }
};

export default connectDB;

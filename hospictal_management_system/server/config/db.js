import mongoose from "mongoose";

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hospital_management";
  const fallbackUri = "mongodb://127.0.0.1:27017/hospital_management";

  try {
    const conn = await mongoose.connect(primaryUri, {
      serverSelectionTimeoutMS: 5000 // 5 sec timeout to attempt quick local fallback if Atlas DNS fails
    });
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB Connection Error (${primaryUri}): ${error.message}`);

    if (primaryUri !== fallbackUri) {
      try {
        console.log(`🔄 Attempting Fallback Connection to Local MongoDB (${fallbackUri})...`);
        const fallbackConn = await mongoose.connect(fallbackUri, {
          serverSelectionTimeoutMS: 5000
        });
        console.log(`✅ Fallback Local MongoDB Connected Successfully: ${fallbackConn.connection.host}`);
      } catch (fallbackError) {
        console.error(`❌ Fallback MongoDB Connection Failed: ${fallbackError.message}`);
      }
    }
  }
};

export default connectDB;

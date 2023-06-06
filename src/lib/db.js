import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Mongoose bağlantısını kurma
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB'ye bağlandı");
  } catch (error) {
    console.error("MongoDB bağlantısı başarısız", error);
    process.exit(1);
  }
};

export default connectDB;

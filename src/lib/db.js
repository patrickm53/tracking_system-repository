// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     // Mongoose bağlantısını kurma
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("MongoDB ye bağlandı");
//   } catch (error) {
//     console.error("MongoDB bağlantısı başarısız", error);
//     throw new Error("MongoDB bağlantısı başarısız");
//   }
// };

// export default connectDB;

import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGO_URL);
  connection.isConnected = db.connections[0].readyState;
}

export default connect;

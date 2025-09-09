if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
};
import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URL}`, {});
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");

  } catch (error) {
    console.log("Database Connection Failed");
    process.exit(1);
  }
};

export default dbConnect;
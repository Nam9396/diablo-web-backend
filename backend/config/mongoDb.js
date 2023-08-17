
import mongoose from "mongoose";

const connectMongoDB = async() => { 
  try { 
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connection detail: HOST: ${conn.connection.host}, NAME: ${conn.connection.name}`);
    mongoose.connection.on('open', () => { 
      console.log('MongoDB connection is established');
    })
  } catch (err) { 
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectMongoDB;
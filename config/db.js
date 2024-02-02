import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect("mongodb+srv://archit:architpassword@ecomcluster.lpy33ov.mongodb.net/ecommerce");
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting with MongoDB: " + error);
  }
};

export default connectDb;
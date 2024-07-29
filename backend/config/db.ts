import mongoose from "mongoose";

const databaseConnect = async () => {
  const uri: string | undefined = process.env.MONGODBURL;
  if (typeof uri === "string") {
    try {
      await mongoose.connect(uri);
      console.log("database successfully connected");
    } catch (error: any) {
      console.log("mongoose error: ", error.message);
    }
  }
};

export default databaseConnect;

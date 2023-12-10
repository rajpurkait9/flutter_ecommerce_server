import mongoose from "mongoose";

const ConnectDB = (uri: string | undefined) => {
  try {
    if (!uri) {
      throw new Error("URI is undefined");
    }
    mongoose.connect(uri);
    console.log("DB is connected");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export default ConnectDB;

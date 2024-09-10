import mongoose from "mongoose";

const dbConnect = async (uri: string|undefined) => {
  if (!uri) {
    throw new Error("Database URI is not provided");
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log("Connected to DB.");
  } catch (error: any) {
    console.log("Error connecting to DB:", error.message);
  }
};

export { dbConnect };

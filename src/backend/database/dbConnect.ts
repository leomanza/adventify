import mongoose from "mongoose";

mongoose.set("strictQuery", false);

if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not defined");

export function dbConnect() {
  return mongoose.connect(`${process.env.MONGODB_URI}`);
}

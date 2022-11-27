import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
  await mongoClient.connect();
  console.log("mongoDB connected");
} catch (error) {
  console.log(error);
}

const db = mongoClient.db("lacopa");
export const productsCollection = db.collection("products");
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const cartCollection = db.collection("cart");
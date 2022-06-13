import express, { application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import transactionRoute from "./routes/transaction.js";
import userRoute from "./routes/users.js";
import stockRoute from "./routes/stock.js";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB reconnected");
});

// middlewares

app.use(cors())
app.use(express.json());
app.use("/transaction", transactionRoute);
app.use("/user", userRoute);
app.use("/stock", stockRoute);

app.listen(8080, () => {
  connect();
  console.log("Application is runing");
});

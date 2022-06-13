import mongoose from "mongoose";
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  date: {
    type: Date,
  }
});

export default mongoose.model("Transaction", TransactionSchema);

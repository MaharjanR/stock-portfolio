import mongoose from "mongoose";
const { Schema } = mongoose;

const StockSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
    buyPerUnit: {
        type: Number,
        required:true,
    },
    sellPerUnit: {
        type: Number,
        required:true,
    }
    
});

export default mongoose.model("Stock", StockSchema);
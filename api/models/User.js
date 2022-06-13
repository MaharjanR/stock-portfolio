import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  stock: [
    {
      name: {
        type: String,
        required: true,
      },
      totalUnits: {
        type: Number,
        default: 0,
      },
      totalInvestment: {
        type: Number,
        default: 0,
      },
      soldAmt: {
        type: Number,
        default: 0,
      },
      currentAmt: {
        type: Number,
        default: 0,
      },
      overallProfit: {
        type: Number,
        default: 0,
      },
    },
    // nepalInvestmentBank: {
    //   totalUnits: {
    //     type: Number,
    //     default: 0,
    //   },
    //   totalInvestment: {
    //     type: Number,
    //     default: 0,
    //   },
    //   soldAmt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   currentAmt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   overallProfit: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
    // total: {
    //   totalUnits: {
    //     type: Number,
    //     default: 0,
    //   },
    //   totalInvestment: {
    //     type: Number,
    //     default: 0,
    //   },
    //   soldAmt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   currentAmt: {
    //     type: Number,
    //     default: 0,
    //   },
    //   overallProfit: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
  ],
});

export default mongoose.model("User", UserSchema);

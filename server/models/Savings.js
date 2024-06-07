import mongoose from "mongoose";

const SavingssSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    savName: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true,
    },
    currAmount: {
        type: Number,
        required: true,
    },
    compDate: {
        type: Date,
        reuqired: true
    },
    savStatus: {
        type: String, 
        required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Savings", SavingsSchema);
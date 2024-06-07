import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema(
  {
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    paymentMethod:{
        type: String,
        required: true,
    },
    paymentAmount: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("PaymentMethod", PaymentMethodSchema);
import mongoose from "mongoose";

const TransactionsSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recAmount: {
        type: Number,
        required: true,
    },
    recDate: {
      type: Date,
      required: true,
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    recDesc: {
        type: String
    },
    recPicture: {
        type: [String],
        validate: {
            validator: function(value){
                return value.length > 0;
            },
        },
    },
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true
    }
  },
  { timestamps: true, collection: 'Transactions' }
);

export default mongoose.model("Transactions", TransactionsSchema);
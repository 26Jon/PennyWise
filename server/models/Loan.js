import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    loanAmount: {
        type: Number,
        required: true,
    },
    loanDate: {
      type: Date,
      required: true,
    },
    loanPerson: {
        type: String, 
        required: true
    },
    loanType: {
        type: String,
        required: true,
    },
    loanDesc: {
        type: String
    },
    loanStatus: {
        type: String,
        required: true
    }
  },
  { timestamps: true, collection: 'Loan' }
);

export default mongoose.model("Loan", LoanSchema);
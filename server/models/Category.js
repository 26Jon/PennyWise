import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryColor: {
        type: String,
        required: true,
    },
    categoryAmount: {
      type: Number,
      required: true,
    },
    categoryType: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
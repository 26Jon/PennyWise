import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
        type: String,
        min: 3,
        max: 20
    },
    code: {
      type: String,
      max: 10,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profileID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    }
  },
  { timestamps: true, collection: 'User' }
);

export default mongoose.model("User", UserSchema);
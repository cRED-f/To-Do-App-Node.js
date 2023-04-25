import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, //aikhane false dewate kotao access pabe nh pass
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//always use schema plural form
export const User = mongoose.model("User", schema);

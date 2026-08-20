import mongoose from "mongoose";

let categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
});

let Category = mongoose.model("category", categorySchema);

export default Category;
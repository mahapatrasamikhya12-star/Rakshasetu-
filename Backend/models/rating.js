import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Rating", ratingSchema);
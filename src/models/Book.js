import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    bookImage: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    genres: [
      {
        type: String,
      },
    ],
    pages: {
      type: String,
    },
    language: {
      type: String,
    },
    years: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Book || mongoose.model("Book", BookSchema);

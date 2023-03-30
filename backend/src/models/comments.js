import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
      trim: true,
    },
    userComId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Blogs",
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;

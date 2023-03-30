import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  {
    timestamps: true,
  }
);

blogsSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "blogId",
});

const Blogs = mongoose.model("Blogs", blogsSchema);

export default Blogs;

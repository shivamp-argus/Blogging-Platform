import mongoose from "mongoose";
import Comments from "./comments.js";

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

blogsSchema.post(
  "remove",
  { query: true, document: false },
  async function (next) {
    console.log(this);
    await Comments.deleteMany({ blogId: this._id });
    next();
  }
);

const Blogs = mongoose.model("Blogs", blogsSchema);

export default Blogs;

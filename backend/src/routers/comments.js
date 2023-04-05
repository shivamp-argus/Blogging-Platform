import express from "express";

import Comments from "../models/comments.js";
import auth from "../middlewares/auth.js";
import Blogs from "../models/blogs.js";
import Users from "../models/users.js";

const router = new express.Router();

// creating comment on a particular blog by authorized user
router.post("/comment/:blogId", auth, async (req, res) => {
  const blogId = req.params.blogId;
  const userId = req.user.id;
  const comment = new Comments({ ...req.body, blogId, userComId: userId });
  try {
    await comment.save();
    res.status(200).send(comment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// getting all the comments on particular blog
router.get("/comment/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const comments = await Comments.find({ blogId });
    res.status(200).send(comments);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// deleting comments by authorized user
router.delete("/comment/:blogId/:commentId", auth, async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;
  const blogId = req.params.blogId;
  const blog = await Blogs.findById(blogId);
  if (!blog) {
    return res.status(400).send("Blog not found");
  }
  try {
    const comment = await Comments.findOne({
      _id: commentId,
    });
    // only comment creator and blog creator can delete the comment
    if (!comment) {
      return res
        .status(400)
        .send("You are not allowed to delete someone else comment");
    }
    // console.log("comment user id", comment.userComId);
    if (!(comment.userComId.equals(userId) || blog.userId.equals(userId))) {
      return res.status(400).send("you are not allowed");
    }
    const deletedComment = await Comments.deleteOne({ _id: commentId });
    if (!deletedComment) {
      return res.status(400).send("Comment deletion unsuccessful");
    }
    res.status(200).send(deletedComment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;

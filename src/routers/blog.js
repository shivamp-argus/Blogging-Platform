import express from "express";
import Blog from "../models/blog.js";

const router = new express.Router();

// creating the blog
router.post("/blog", async (req, res) => {
  const blog = new Blog({ ...req.body });
  //   console.log(blog);

  try {
    await blog.save();
    res.status(200).send(blog);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// getting all the blogs
router.get("/blog", async (req, res) => {
  const blog = await Blog.find();
  try {
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

// getting blog by id

router.get("/blog/:id", async (req, res) => {
  //   console.log(req.params.id);
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  try {
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

// updating the blog by id
router.patch("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findByIdAndUpdate(blogId, { ...req.body });
  try {
    await blog.save();
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

// deleting the blog by id
router.delete("/blog/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findByIdAndRemove(blogId);
  console.log(blog);
  try {
    await blog.save();
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;

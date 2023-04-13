import express from 'express';

import Blogs from '../models/blogs.js';
import auth from '../middlewares/auth.js';

const router = new express.Router();

// creating the blog
router.post('/blog', auth, async (req, res) => {
  const userId = req.user.id;
  const blogs = new Blogs({ ...req.body, userId });
  //   console.log(blog);
  try {
    await blogs.save();
    res.status(200).send(blogs);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// getting all the blogs
router.get('/blog', async (req, res) => {
  const pageNo = req.query.page || 1;
  const limitValue = 5;
  const skipValue = (pageNo - 1) * limitValue;
  const tempBlogs = await Blogs.count();
  const pages = Math.ceil(tempBlogs / limitValue);
  try {
    const blogs = await Blogs.find().skip(skipValue).limit(limitValue);

    res.status(200).send({ blogs: blogs, count: pages });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

//getting blogs of particular user only
// router.get("/blog/me", auth, async (req, res) => {
//   // const userId = ObjectId(req.user.id);
//   const userId = req.user.id;
//   try {
//     const blog = await Blogs.find({ userId });
//     res.status(200).send(blog);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

// getting blog by id
router.get('/blog/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blogs.findById(blogId);
    await blog.populate({ path: 'comments' });
    res.status(200).send({ blog, comments: blog.comments });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// updating the blog by id
router.patch('/blog/:id', auth, async (req, res) => {
  const userId = req.user.id;
  const blogId = req.params.id;
  if (!blogId) {
    return res.status(400).send('Please enter valid id');
  }
  try {
    const blog = await Blogs.findOneAndUpdate(
      { _id: blogId, userId },
      { ...req.body, userId },
      { new: true }
    );
    if (!blog) {
      return res.status(400).send('You are not allowed to change');
    }
    await blog.save();
    res.status(200).send(blog);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// deleting the blog by id
router.delete('/blog/:id', auth, async (req, res) => {
  const blogId = req.params.id;
  const userId = req.user.id;
  if (!blogId) {
    return res.status(400).send('Please enter valid id');
  }
  try {
    const blog = await Blogs.findOneAndDelete({ _id: blogId, userId });
    if (!blog) {
      res.status(400).send('Blog not found');
    } else {
      res.status(200).send(blog);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;

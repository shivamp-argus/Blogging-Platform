import express from "express";
import Users from "../models/users.js";
import auth from "../middlewares/auth.js";

const router = new express.Router();

// Creating user
router.post("/user", async (req, res) => {
  // console.log(req.body);
  try {
    const user = new Users({ ...req.body });
    // console.log(user);
    const token = await user.generateAuthToken();
    // console.log(token);
    await user.save();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// creating login route
router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// creating logout route
router.post("/user/logout", auth, async (req, res) => {
  try {
    console.log(req);
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Logged out");
  } catch (error) {
    res.status(500).send(error);
  }
});

// removing all the tokens from user
router.post("/user/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    console.log(req.user.tokens);
    await req.user.save();
    res.status(200).send("Successfully logged out all the tokens cleared");
  } catch (error) {
    res.status(500).send(error);
  }
});

//Selecting all users
router.get("/user", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Viewing own profile
router.get("/user/me", auth, async (req, res) => {
  //   res.send(req.user);
  try {
    await req.user.populate({ path: "blogs" });
    res.send({ users: req.user, blogs: req.user.blogs });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Selecting user by id
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  //   if (!userId) {
  //     return res.status(400).send("Please enter valid id");
  //   }
  try {
    const user = await Users.findById(userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// updating the user
router.patch("/user/:id", auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true }
    );
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Deleting user by id
router.delete("/user/:id", auth, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByIdAndDelete(userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;

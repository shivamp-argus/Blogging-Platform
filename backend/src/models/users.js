import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Blogs from "./blogs.js";
import Comments from "./comments.js";

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "Username should be atleast 3 characters long"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Email not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password must be of more than 6 characters"],
      validate(val) {
        if (val.toLowerCase().includes("password")) {
          throw new Error("Password can not include password");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

usersSchema.virtual("blogs", {
  ref: "Blogs",
  localField: "_id",
  foreignField: "userId",
});

usersSchema.virtual("comments", {
  ref: "Comments",
  localField: "_id",
  foreignField: "userComId",
});

// generate auth token
usersSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, "BloggingPlatform");
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

// checking if user is valid when logging in
usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }
  if (user.email === email) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("not a valid password");
    }
    // console.log(user);
    return user;
  }
};

// showing only user details and not sensitive information
usersSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// before saving convert password into hash
usersSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

usersSchema.pre(
  "findOneAndDelete",
  { query: true, document: false },
  async function (next) {
    console.log(this);
    await Blogs.deleteMany({ userId: this._conditions._id });
    await Comments.deleteMany({ userComId: this._conditions._id });
    next();
  }
);

const Users = mongoose.model("Users", usersSchema);

export default Users;

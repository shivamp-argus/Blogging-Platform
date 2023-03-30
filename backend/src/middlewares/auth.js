import jwt from "jsonwebtoken";
import Users from "../models/users.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "BloggingPlatform");
    const user = await Users.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    // console.log(token);
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

export default auth;

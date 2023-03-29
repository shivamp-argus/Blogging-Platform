import express from "express";
import "./db/mongoose.js";

import blogRouter from "./routers/blogs.js";
import usersRouter from "./routers/users.js";

const app = express();
app.use(express.json());
app.use(blogRouter);
app.use(usersRouter);

export default app;

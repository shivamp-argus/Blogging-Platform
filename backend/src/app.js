import express from "express";
import cors from "cors";
import "./db/mongoose.js";

import blogRouter from "./routers/blogs.js";
import usersRouter from "./routers/users.js";
import commentsRouter from "./routers/comments.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(blogRouter);
app.use(usersRouter);
app.use(commentsRouter);

export default app;

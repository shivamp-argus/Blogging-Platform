import express from "express";
import "./db/mongoose.js";

import blogRouter from "./routers/blog.js";

const app = express();
app.use(express.json());
app.use(blogRouter);

export default app;

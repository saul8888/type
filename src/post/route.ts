import { Router } from "express"
import { auth } from "../middleware/auth";
import { createPost, getTotalPost, getPost, updatePost, deletePost } from "./handler"

const post = Router();

//create a red
post.post("/newpost", auth, createPost)
post.get("/me/:id", auth, getPost)
post.get("/total", auth, getTotalPost)
post.put("/me/:id", auth, updatePost)
post.delete("/me/:id", auth, deletePost)

export default post
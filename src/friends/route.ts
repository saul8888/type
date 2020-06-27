import { Router } from "express"
import { auth } from "../middleware/auth";
import { createFriend, getTotalFriend, getFriend, updateFriend, deleteFriend } from "./handler"

const friend = Router();


//create a red
friend.post("/newfriend/:id", auth, createFriend)
friend.get("/me/:id", auth, getFriend)
friend.get("/total", auth, getTotalFriend)
friend.put("/me/:id", auth, updateFriend)
friend.delete("/me/:id", auth, deleteFriend)

export default friend
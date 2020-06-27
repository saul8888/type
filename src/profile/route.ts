import { Router } from "express"
import { auth } from "../middleware/auth";
import { createProfile, getTotalProfiles, getProfile, updateProfile, deleteProfile, login, logoutProfile, logoutAllProfile } from "./handler"

const profile = Router();

profile.get("/total", getTotalProfiles)
//for profile
profile.post("/register", createProfile)
profile.post("/login", login)
profile.get("/me", auth, getProfile)
profile.put("", auth, updateProfile)
profile.delete("", auth, deleteProfile)
profile.delete("/logout", auth, logoutProfile)
profile.delete("/logoutAll", auth, logoutAllProfile)


export default profile
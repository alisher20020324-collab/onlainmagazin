import { Router } from "express";
import { SignUp } from "../auth/Signup.js";
import { check, Login } from "../auth/Login.js";
let route = Router();

route.post("/signup", SignUp);
route.post("/login", Login);
route.get("/me", check);

export default route;

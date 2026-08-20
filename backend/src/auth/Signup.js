import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const SignUp = async (req, res) => {
  try {
    const { name, email, age, password, role } = req.body;
     let findUser = await User.findOne({ email });
     console.log(findUser);
     
    if (findUser) {
      return res.status(400).json({ message: "Bunaqa email bor!" });
    }

    let isRole = role ? "admin" : "user";

    let hashPassword = await bcrypt.hash(password, 10);

    let token = await jwt.sign({ name, role: isRole }, process.env.SECRET_KEY);
    let newUser = await User.create({
      name,
      email,
      age,
      password: hashPassword,
      role: isRole,
    });


    res.cookie("token",token)

    return res
      .status(201)
      .json({ message: "Ro'yhatdat o'toldi✅", user: newUser, token });
  } catch (err) {
     
    return res.status(500).json({ message: "Failed server" });
  }
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ message: "Bunaqa email yo'q!" });
    }
    let checkPassowrd = await bcrypt.compare(password, findUser.password);
    if (!checkPassowrd) {
      return res.status(404).json({ message: "Parolingiz xato!❌" });
    }
    let token = await jwt.sign(
      {
        id: findUser._id,
        name: findUser.name,
        role: findUser.role,
      },
      process.env.SECRET_KEY,
    );
    res.cookie("token", token);
    return res
      .status(200)
      .json({ message: "Succesfull✅", user: findUser, token });
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};
export const check = async(req,res) => {
   let token = req.cookies.token;
   console.log(token);
   
}

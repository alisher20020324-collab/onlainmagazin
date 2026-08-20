import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import user from "../routes/userRoute.js";
import category from "../routes/categoryRoute.js";
import product from "../routes/productRoute.js";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
dotenv.config();
let app = express();
let PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

let URL = process.env.MONGODB_URL.replace(
  "<db_password>",
  process.env.MOGODB_PASSWSORD,
);
mongoose
  .connect(URL)
  .then(() => {
    console.log("Mongodb ulandi✅");
  })
  .catch((err) => {
    console.log(`Mongodb ulanmadi:${err}❌ `);
  });

// let limiter = rateLimit({
//   windowMs: 60 * 1000,
//   limit: 5,
//   message: {
//     status: 429,
//     message: "Juda ko'p so'rov jo'natildi!",
//   },
// });

// let speedLimeter = slowDown({
//   windowMs: 60 * 1000,
//   delayAfter: 5,
//   delayMs: 500,
// });
// app.use(limiter);
// app.use(speedLimeter);

// app.use(morgan());
// app.use(helmet());
app.use(cookieParser());
app.use("/api/v1", user);
app.use("/api/v1", category);
app.use("/api/v1", product);
app.listen(PORT, () => {
  console.log(`Create run server in ${PORT}`);
});

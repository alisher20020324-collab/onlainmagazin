import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
     let authHeader = req.headers.authorization;
     console.log(authHeader);
     
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provider" });
    }

    let token = authHeader.split(" ")[1];
    let claims = await jwt.verify(token, process.env.SECRET_KEY);
    req.user = claims;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role == "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "Sizga ruxsat yo'q" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

import jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) res.json({ message: "user not logged In" });
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.body = decode;

    next();
  } catch (error) {
    res.json({ message: "middleware error" });
  }
};

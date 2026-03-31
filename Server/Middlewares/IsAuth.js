import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not found"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized: Invalid or expired token"
    });
  }
};

export default isAuth;
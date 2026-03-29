import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

export const googleauth = async (req, res) => {
  try {
    let { name, email, avatar } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "email is required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email, avatar });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: `google auth error ${error}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "logout error",
    });
  }
};
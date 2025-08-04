import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registratin
const register = async (req, res) => {
  const { username, email, password, contactNumber } = req.body;

  if (!username || !email || !password || !contactNumber) {
    return res.json({ success: false, message: "All Fields are required" });
  }

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.json({ success: false, message: "User is already exsit" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hash Password : ", hashPassword);

    function generateReferralCode() {
      return Math.random().toString(36).substring(2, 8).toUpperCase(); // e.g., "A1B2C3"
    }

    const referralCode = `${username.toLowerCase()}2025`;
    const user = new User({
      username,
      email,
      password: hashPassword,
      contactNumber,
      referralCode: generateReferralCode(), // You can create a helper for this
      totalDonations: 0,
      rewards: [],
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameTime: process.env.NODE_ENV === "production",
      none: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Registration Successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Logging
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please Enter the Email end Password Again ",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Email is invalid please try again",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Password does not match please try again ",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameTime: process.env.NODE_ENV === "production",
      none: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res.json({ success: true, message: "Logging Successful" });

    res.status(200).json({
      success: true,
      token, // your JWT
      user: {
        _id: user._id,
        email: user.email,
        // other fields if needed
      },
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    return res.json({ success: true, message: "Logedd out" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

// Dashboard
const getDashboardData = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Received userId:", userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    return res.json({
      success: true,
      username: user.username,
      email: user.email,
      contactNo: user.contactNo,
      referralCode: user.referralCode,
      totalDonations: user.totalDonations || 1,
      rewards: ["Certificate Unlocked", "T-Shirt Unlocked"],
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};


export { register, login, logout, getDashboardData };

import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

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

    const referralCode = `${username.toLowerCase()}2025`;
    const user = new User({
      username,
      email,
      password: hashPassword,
      contactNumber,
      referralCode,
      totalDonations: 0,
    });
    await user.save();

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

    return res.json({ success: true, message: "Logging Successful" });
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
export { register, login, logout };

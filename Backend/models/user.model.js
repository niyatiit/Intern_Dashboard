import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  contactNumber: {
    type: String, // ✅ better as string to preserve leading zeros
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // ✅ validate 10-digit numbers
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
  },
  referralCode: {
    type: String,
    required: true,
  },
  totalDonations: {
    type: String,
    required: true,
    default: 0,
  },
  rewards: {
    type: [String],
    default : [],
  },
});

const User = mongoose.model("User", userSchema);
export { User };

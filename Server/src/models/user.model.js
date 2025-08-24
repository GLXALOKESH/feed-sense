import mongoose from "mongoose";
import bcrype from "bcrypt";
import jwt from "jsonwebtoken";



const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["PM", "Admin"], default: "PM" },
  username: { type: String, required: true, unique: true },
}, { timestamps: true });

userSchema.pre("save", async function (next) {

  if (!this.isModified("passwordHash")) return next();

  this.passwordHash = await bcrype.hash(this.passwordHash, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  if (!this.passwordHash) {
    throw new Error("No password hash set for user");
  }
  if (!password) {
    throw new Error("No password provided for comparison");
  }
  return await bcrype.compare(password, this.passwordHash);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      fullName: this.fullName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
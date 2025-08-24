import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponce.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { decode } from "jsonwebtoken";

const getRefreshAndAccessToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.messege || "Error while generating access or refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, role, phone } = req.body;
  if ([email, name, password, phone].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const existuser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existuser) {
    throw new ApiError(409, "Email or phone already exists");
  }

  // Save password as plain text (for demo only)
  const user = await User.create({
    name,
    email,
    passwordHash: password,
    phone,
    role,
  });

  const createduser = await User.findById(user._id).select(
    "-passwordHash -refreshToken"
  );

  if (!createduser) {
    throw new ApiError(500, "Something Went Wrong in server");
  }

  return res
    .status(201)
    .json(new ApiResponce(200, createduser, "Successfully registered"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email) || !password) {
    throw new ApiError(401, "Email/phone and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare plain text password
  const isPasswordvalid = password === user.passwordHash;

  if (!isPasswordvalid) {
    throw new ApiError(401, "Password is incorrect");
  }

  const { accessToken, refreshToken } = await getRefreshAndAccessToken(user._id);
  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, { ...options, sameSite: "lax" })
    .cookie("refreshToken", refreshToken, { ...options, sameSite: "lax" })
    .json(
      new ApiResponce(
        200,
        { user: { name: user.name, phone: user.phone, email: user.email, role: user.role }, accessToken, refreshToken },
        "User Logged in Successfully"
      )
    );
});


export {
  registerUser,
  loginUser,
};
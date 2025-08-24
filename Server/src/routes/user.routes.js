import { Router } from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  refreshAuthToken,
  getCurrentUser,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// router.route("/logout").post(verifyToken, logoutUser);
// router.route("/refresh-token", refreshAuthToken);


// router.route("/get-user").post(verifyToken, getCurrentUser);

router.route("/profile")
  .get(verifyToken, getProfile)
  .put(verifyToken, updateProfile);


export default router;
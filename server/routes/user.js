import express from "express";
import {
  getMentors,
  loginUser,
  registerUser,
  requestMeeting,
  resetPassword,
  resetPasswordToken,
  uploadImage,
  verifyEmail,
  verifyOTP,
} from "../controllers/user.js";
import { registerValidation, registerValidationHandler } from "../middlewares/validations.js";
import multer from "multer";

const upload = multer({ dest: "public/images/user-profile-images" });

const router = express.Router();

router.post("/register", registerValidation, registerValidationHandler, registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", resetPasswordToken);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

router.post("/upload", upload.single("image"), uploadImage);

router.get("/get-mentors", getMentors);

router.post("/request-meeting", requestMeeting);

export default router;

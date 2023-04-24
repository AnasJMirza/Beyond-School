import express from "express";
import { loginUser, registerUser, resetPassword, resetPasswordToken, verifyEmail, verifyOTP } from "../controllers/user.js";
import {
  registerValidation,
  registerValidationHandler,
} from "../middlewares/validations.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  registerValidationHandler,
  registerUser
);


router.post(
  "/login",
  loginUser
);

router.post(
  "/verify-email",
  verifyEmail
);

router.post(
  "/forgot-password",
  resetPasswordToken
);


router.post(
  "/verify-otp",
  verifyOTP
);


router.post(
  "/reset-password",
  resetPassword
);

export default router;

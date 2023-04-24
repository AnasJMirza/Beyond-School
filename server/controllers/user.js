import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendErrorResponse } from "../utils/helper.js";
import * as dotenv from "dotenv";
import {
  generateEmailTemplate,
  generateOTP,
  generateWelcomeEmailTemplate,
  mailTransport,
  resetPasswordEmailTemplate,
} from "../utils/mail.js";
import verificationToken from "../models/verificationToken.js";
import { isValidObjectId } from "mongoose";
import ResetToken from "../models/ResetToken.js";

dotenv.config();

// this function is used to register the user
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) return sendErrorResponse(res, "User already exists!");
  const newUser = new User({
    name,
    email,
    password,
    role,
  });

  // generate otp to verify email before saving the user
  const otp = generateOTP();
  const verficationToken = new verificationToken({
    owner: newUser._id,
    token: otp,
  });

  // send otp to user email
  mailTransport().sendMail({
    from: "beyond-school@gmail.com",
    to: email,
    subject: "Email Verification",
    html: generateEmailTemplate(otp, newUser?.name),
  });

  await verficationToken.save();
  await newUser.save();
  res.json(newUser);
};

// this function is used to login the user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // check if email and password is provided
  if (!email.trim() || !password.trim())
    return sendErrorResponse(res, "Email/Password Required!");

  // find the user in the database
  const user = await User.findOne({ email });

  // return error if the user not found
  if (!user) return sendErrorResponse(res, "User does not exist!");

  // compare the password
  const isPasswordMatch = await user.comparePassword(password);

  // return error if the password not matched
  if (!isPasswordMatch)
    return sendErrorResponse(res, "Email/Password not matched");

  // generate jwt token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // return the user and token
  const response = {
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };

  res.json({ success: true, response });
};

// this function Verify email address of the user
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  // check if userId and otp is provided
  if (!userId || !otp) return sendErrorResponse(res, "Invalid Request!");

  // check if userId is valid
  if (!isValidObjectId(userId))
    return sendErrorResponse(res, "Invalid User Id!");

  // check if user exist
  const user = await User.findById(userId);
  if (!user) return sendErrorResponse(res, "User not found!");

  // check if user already verified
  if (user.verified) return sendErrorResponse(res, "Email already verified!");

  // check if token exist
  const token = await verificationToken.findOne({ owner: userId });
  if (!token) return sendErrorResponse(res, "Sorry, user not found!");

  // compare the otp
  const isTokenMatch = await token.compareToken(otp);
  if (!isTokenMatch) return sendErrorResponse(res, "Invalid OTP!");

  // update the user verified status
  user.verified = true;

  // delete the token from the database
  await verificationToken.findByIdAndDelete(token._id);

  // save the user
  await user.save();

  // send varification success email
  mailTransport().sendMail({
    from: "beyond-school@gmail.com",
    to: user.email,
    subject: "Verification Successfull",
    html: generateWelcomeEmailTemplate(user?.name),
  });

  // return the user
  const response = {
    name: user.name,
    email: user.email,
    role: user.role,
    verified: user.verified,
  };

  res.json({
    success: true,
    message: "Email verified successfully!",
    response,
  });
};

// this function will give you the token to reset the password

export const resetPasswordToken = async (req, res) => {
  const { email } = req.body;

  // check if email is provided
  if (!email?.trim()) return sendErrorResponse(res, "Email Required!");

  // check if user exist
  const user = await User.findOne({ email });
  if (!user) return sendErrorResponse(res, "User not found!");


  // generate otp to send to user email
  const otp = generateOTP();
  const resetToken = new ResetToken({
    owner: user._id,
    token: otp,
  });

  // save the token
  await resetToken.save();

  // send otp to user email
  mailTransport().sendMail({
    from: "beyond-school@gmail.com",
    to: email,
    subject: "Reset Password",
    html: resetPasswordEmailTemplate(user.name, otp),
  });

  const response = {
    userId: user._id,
  }

  // return success message
  res.json({ success: true, message: "OTP sent to your email!", response });
};



// this function is for this function will check the if the otp is valid or not

export const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  // check if userId and otp is provided
  if (!userId || !otp) return sendErrorResponse(res, "Invalid Request!");

  // check if userId is valid
  if (!isValidObjectId(userId))
    return sendErrorResponse(res, "Invalid User Id!");

  // check if user exist
  const user = await User.findById(userId);
  if (!user) return sendErrorResponse(res, "User not found!");

  

  // check if token exist
  const token = await ResetToken.findOne({ owner: userId });
  if (!token) return sendErrorResponse(res, "Sorry, somthing went wrong!");

  // compare the otp
  const isTokenMatch = await token.compareToken(otp);
  if (!isTokenMatch) return sendErrorResponse(res, "Invalid OTP!");


  // delete the token from the database
  await ResetToken.findByIdAndDelete(token._id);

const response = {
  userId: user._id,
}
  res.json({
    success: true,
    message: "Success!",
    response,
  });

}

export const resetPassword = async (req, res) => {
  const { userId, password } = req.body;

  // check if userId and password is provided
  if (!userId || !password.trim()) return sendErrorResponse(res, "Invalid Request!");

  const user = await User.findById(userId);
  if (!user) return sendErrorResponse(res, "User not found!");

  user.password = password;
  await user.save();

  res.json({success: true, message: "Password reset successfully!"})

  


}
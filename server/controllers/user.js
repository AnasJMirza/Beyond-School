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
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

// Cloudinary configuration (replace with your own credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  const image = req?.file?.path;
  try {
    // Upload image to Cloudinary
    const cloudinaryUpload = await cloudinary.uploader.upload(image, {
      folder: "user-profile-images", // Set the desired folder in Cloudinary
    });

    // Return the Cloudinary image URL as the response
    res.json({ imageUrl: cloudinaryUpload.secure_url });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error during image upload:", error);
    res.status(500).json({ error: "An error occurred during image upload." });
  }
};

// this function is used to register the user
export const registerUser = async (req, res) => {
  const { name, email, password, profile, role } = req.body;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) return sendErrorResponse(res, "User already exists!");
  const newUser = new User({
    name,
    email,
    password,
    role,
    profile,
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
  console.log(email, password);

  // check if email and password is provided
  if (!email.trim() || !password.trim()) return sendErrorResponse(res, "Email/Password Required!");

  // find the user in the database
  const user = await User.findOne({ email });

  // return error if the user not found
  if (!user) return sendErrorResponse(res, "User does not exist!");

  // compare the password
  const isPasswordMatch = await user.comparePassword(password);

  // return error if the password not matched
  if (!isPasswordMatch) return sendErrorResponse(res, "Email/Password not matched");

  // generate jwt token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // return the user and token
  const response = {
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile,
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
  if (!isValidObjectId(userId)) return sendErrorResponse(res, "Invalid User Id!");

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
  };

  // return success message
  res.json({ success: true, message: "OTP sent to your email!", response });
};

// this function is for this function will check the if the otp is valid or not

export const verifyOTP = async (req, res) => {
  const { userId, otp } = req.body;

  // check if userId and otp is provided
  if (!userId || !otp) return sendErrorResponse(res, "Invalid Request!");

  // check if userId is valid
  if (!isValidObjectId(userId)) return sendErrorResponse(res, "Invalid User Id!");

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
  };
  res.json({
    success: true,
    message: "Success!",
    response,
  });
};

export const resetPassword = async (req, res) => {
  const { userId, password } = req.body;

  // check if userId and password is provided
  if (!userId || !password.trim()) return sendErrorResponse(res, "Invalid Request!");

  const user = await User.findById(userId);
  if (!user) return sendErrorResponse(res, "User not found!");

  user.password = password;
  await user.save();

  res.json({ success: true, message: "Password reset successfully!" });
};

export const getMentors = async (req, res) => {
  const mentors = await User.find({ role: "mentor" });
  res.json({ success: true, mentors });
};

export const requestMeeting = async (req, res) => {
  try {
    const { userName, userEmail, dateTime, mentorId } = req.body;

    // Construct the new meeting object
    const newMeetingObj = {
      userName,
      userEmail,
      dateTime,
      mentorId,
    };

    // Update the meeting field in MongoDB
    const updatedMeeting = await User.findByIdAndUpdate(
      { _id: mentorId }, // Specify the meeting ID
      { $push: { meeting: newMeetingObj } }, // Add the new meeting object to the meeting array
      { new: true } // Return the updated meeting document
    );

    res.json(updatedMeeting);
  } catch (error) {
    console.error("Error updating meeting:", error);
    res.status(500).json({ error: "An error occurred while updating the meeting" });
  }
};

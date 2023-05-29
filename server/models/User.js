import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  profile: {
    type: String,
    default: "",
  },

  role: {
    type: String,
    default: "student",
  },

  varified: {
    type: Boolean,
    default: false,
  },

  speciality: {
    type: String,
    default: "N/A",
  },

  experience: {
    type: Number,
    default: 0,
  },

  designation: {
    type: String,
    default: "N/A",
  },

  rating: {
    type: String,
    default: "N/A",
  },

  country: {
    type: String,
    default: "Paksitan",
  },

  meeting: {
    type: Array,
    default: [],
  },
});

// Hashing password before saving
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) user.password = await bcrypt.hash(user.password, 8);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

export default mongoose.model.Users || mongoose.model("User", UserSchema);

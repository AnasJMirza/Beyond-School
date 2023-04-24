import mongoose from "mongoose";
import bcrypt from "bcrypt";

const VerificationTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  }
});

// Hashing verification token before saving
VerificationTokenSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("token"))
    user.token = await bcrypt.hash(user.token, 8);
  next();
});

// Compare token
VerificationTokenSchema.methods.compareToken = async function (token) {
  const user = this;
  return await bcrypt.compare(token, user.token);
};

export default mongoose.model.Users ||
  mongoose.model("VerificationToken", VerificationTokenSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
   role: {
    type: String,
    enum: ["SUPER_ADMIN", "GENERAL_ADMIN", "INSPECT_ADMIN", "MODERATOR", "USER"],
    default: "USER"
  }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
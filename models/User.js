import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
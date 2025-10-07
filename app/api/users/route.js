import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, phone, email, password, confirmPassword } = await req.json();

    if (!name || !phone || !email || !password || !confirmPassword)
      return Response.json({ error: "All fields required" }, { status: 400 });

    if (password !== confirmPassword)
      return Response.json({ error: "Passwords do not match" }, { status: 400 });

    await connectDB();

    const exist = await User.findOne({ $or: [{ email }, { phone }] });
    if (exist) return Response.json({ error: "User already exists" }, { status: 400 });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, phone, email, password: hashed });
    await newUser.save();

    return Response.json({ message: "User created successfully" }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
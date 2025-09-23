import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const users = db.collection("users");

    const existing = await users.findOne({ email });
    if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({ name, email, phone, password: hashedPassword, createdAt: new Date() });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
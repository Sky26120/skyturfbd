import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { name, phone, email, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("skyturf");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ name, phone, email, password: hashed });

    return NextResponse.json({ message: "Signup successful" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
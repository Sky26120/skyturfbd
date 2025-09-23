import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("skyturf");
    const existing = await db.collection("users").findOne({ email });
    if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 400 });

    const hash = await bcrypt.hash(password, 10);
    await db.collection("users").insertOne({ name, email, phone, password: hash });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
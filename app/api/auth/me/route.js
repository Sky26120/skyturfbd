import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return new Response(JSON.stringify({ user }));
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
}
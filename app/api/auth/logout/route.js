import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("auth_token", "", { expires: new Date(0), path: "/" });
  return res;
}
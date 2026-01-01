import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const ALLOWED_ROLES = [
  "USER",
  "GENERAL_ADMIN",
  "MODERATOR",
  "INSPECT_ADMIN",
];

export async function PATCH(request, { params }) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { role } = await request.json();

    if (!ALLOWED_ROLES.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    await connectDB();

    await User.findByIdAndUpdate(params.id, { role });

    return NextResponse.json({ message: "Role updated" });
  } catch (error) {
    console.error("UPDATE ROLE ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

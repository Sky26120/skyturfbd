import { NextResponse } from "next/server";


import { connectDB } from "@/lib/mongodb";


import { auth } from "@/auth";
import { hasPermission } from "@/lib/hasPermissions";
import { PERMISSIONS } from "@/lib/permissions";
import Booking from "@/models/Booking";

const STATUS_ORDER = ["pending", "confirmed", "completed", "cancelled"];

export async function PATCH(req, { params }) {


  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
    await   connectDB();

  const { id } = params;
  const { status: newStatus } = await req.json();

  if (!STATUS_ORDER.includes(newStatus)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  const booking = await Booking.findById(id);
  if (!booking) {
    return NextResponse.json({ message: "Booking not found" }, { status: 404 });
  }

  const role = session.user.role;


  const canUpdate =
    role === "SUPER_ADMIN" ||
    hasPermission(role, PERMISSIONS.CONFIRM_BOOKING) ||
    hasPermission(role, PERMISSIONS.COMPLETED_BOOKING) ||
    hasPermission(role, PERMISSIONS.CANCEL_BOOKING);

  if (!canUpdate) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

 
  const currentIndex = STATUS_ORDER.indexOf(booking.status);
  const nextIndex = STATUS_ORDER.indexOf(newStatus);

  if (nextIndex < currentIndex) {
    return NextResponse.json(
      { message: "Status cannot move backward" },
      { status: 400 }
    );
  }

  booking.status = newStatus;
  await booking.save();

  return NextResponse.json({
    message: "Status updated successfully",
    status: booking.status,
  });
}

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

import { PERMISSIONS } from "@/lib/permissions";
import { hasPermission } from "@/lib/hasPermissions";


export async function POST(request) {
  try {
    const session = await auth();
 


    if (!session) {
      return NextResponse.json({ error: "Please login first" }, { status: 401 });
    }

    await connectDB();

    const {
      arenaName,
      bookingDate,
      timeSlot,
      notes,
      paymentType,
      totalAmount,
      transactionId
    } = await request.json();

    if (!arenaName || !bookingDate || !timeSlot || !paymentType || !totalAmount || !transactionId) {
      return NextResponse.json({ error: "Please fill all required fields" }, { status: 400 });
    }

    
    const existingBooking = await Booking.findOne({
      arenaName,
      bookingDate: new Date(bookingDate),
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return NextResponse.json({ error: "This slot is already booked" }, { status: 400 });
    }

    
    let paidAmount = 0;
    let paymentStatus = "unpaid";

    if (paymentType === "full") {
      paidAmount = totalAmount;
      paymentStatus = "paid";
    } else if (paymentType === "advance") {
      paidAmount = 500; 
      paymentStatus = "partial";
    }

    const booking = await Booking.create({
      user: session.user.id,
      userName: session.user.name,
      userPhone: session.user.phone,
      arenaName,
      bookingDate: new Date(bookingDate),
      timeSlot,
      duration: 90,
      notes: notes || "",
      paymentType,
      totalAmount,
      paidAmount,
      paymentStatus,
      status: "pending",
      createdByRole: session.user.role,
      transactionId, 
    });

    return NextResponse.json(
      { success: true, message: "Booking created successfully", booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}


export async function GET(request) {
  try {
    const session = await auth();
  console.log("role from db",session.user.role);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { id: userId, role } = session.user;

    let query = {};
   

   if (hasPermission(role, PERMISSIONS.VIEW_ALL_BOOKINGS)) {
      query = {}; 
    } else if (hasPermission(role, PERMISSIONS.VIEW_OWN_BOOKINGS)) {
      query = { user: userId }; 
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

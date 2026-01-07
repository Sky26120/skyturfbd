import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

import { PERMISSIONS } from "@/lib/permissions";
import { hasPermission } from "@/lib/hasPermissions";
import User from "@/models/User";
import mongoose from "mongoose";





export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Please login first" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();

    const {
      arenaName,
      bookingDate,
      timeSlot,
      notes,
      paymentType,
      totalAmount,
      transactionId,
      bookingForName,
      bookingForPhone,
    } = body;

    if ( !arenaName ||
  !bookingDate ||
  !timeSlot ||
  !paymentType ||
  totalAmount === undefined ||
  totalAmount === null ||
  !transactionId) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }
    if (transactionId.length !== 10) {
  return NextResponse.json(
    { error: "Transaction ID must be exactly 10 characters" },
    { status: 400 }
  );
}
    

   
    const existingBooking = await Booking.findOne({
      arenaName,
      bookingDate: new Date(bookingDate),
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This slot is already booked" },
        { status: 400 }
      );
    }


    let paidAmount = 0;
    let paymentStatus = "unpaid";

    if (paymentType === "full") {
      paidAmount = totalAmount;
      paymentStatus = "paid";
    } else if (paymentType === "advance") {
      paidAmount = totalAmount; 
      paymentStatus = "partial";
    }

   
   let finalUserId = null;
    let finalName = "";
    let finalPhone = "";

   if (session.user.role === "USER") {
  const dbUser = await User.findOne({ email: session.user.email });

  if (!dbUser) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  finalUserId = dbUser._id; 
  finalName = session.user.name;
  finalPhone = session.user.phone;
} else {
 
      if (!bookingForName || !bookingForPhone) {
        return NextResponse.json(
          { error: "Customer name and phone are required" },
          { status: 400 }
        );
      }

      finalName = bookingForName;
      finalPhone = bookingForPhone;
    }

    const booking = await Booking.create({
     user: new mongoose.Types.ObjectId(finalUserId),
      bookingForName: finalName,
      bookingForPhone: finalPhone,

      arenaName,
      bookingDate: new Date(bookingDate),
      timeSlot,
      duration: 90,
      notes: notes || "",

      paymentType,
      totalAmount,
      paidAmount,
      paymentStatus,

      transactionId,
      status: "pending",
      bookingByRole: session.user.role,
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

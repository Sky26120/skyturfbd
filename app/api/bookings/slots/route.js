import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

const TIME_SLOTS = [
  "05:00am to 06:30am",
  "06:30am to 08:00am",
  "08:00am to 09:30am",
  "09:30am to 11:00am",
  "11:00am to 12:30pm",
  "12:30pm to 02:00pm",
  "02:00pm to 03:30pm",
  "03:30pm to 05:00pm",
  "05:00pm to 06:30pm",
  "06:30pm to 08:00pm",
  "08:00pm to 09:30pm",
  "09:30pm to 11:00pm",
  "11:00pm to 12:30am",
  "12:30am to 02:00am",
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const arenaName = searchParams.get("arena");
    const dateParam = searchParams.get("date");

    if (!arenaName || !dateParam) {
      return NextResponse.json({ error: "Missing arena or date" }, { status: 400 });
    }

    await connectDB();

    const bookingDate = new Date(dateParam);
    bookingDate.setHours(0, 0, 0, 0);

    const bookings = await Booking.find({
      arenaName,
      bookingDate,
      status: { $in: ["pending", "confirmed"] },
    }).select("timeSlot");

    const bookedSlots = bookings.map(b => b.timeSlot);

    const today = new Date();
    today.setSeconds(0, 0, 0, 0);

   
    let availableSlots = TIME_SLOTS.filter(slot => !bookedSlots.includes(slot));

   
    if (bookingDate.toDateString() === today.toDateString()) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();

      availableSlots = availableSlots.filter(slot => {
        const [start] = slot.split(" to ");
        let [hour, minPart] = start.split(":");
        let minutes = parseInt(minPart);
        hour = parseInt(hour);

        if (start.includes("pm") && hour !== 12) hour += 12;
        if (start.includes("am") && hour === 12) hour = 0;

        return hour > currentHour || (hour === currentHour && minutes > currentMinute);
      });
    }

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

"use client";

import AdminBookings from "./AdminBooking";
import UserBookings from "./UserBookings";


export default function DashboardContent({ role }) {
  
  if (role === "USER") return <UserBookings />;


  return <AdminBookings />;
}

"use client";

import AdminBookings from "./AdminBooking";
import SuperAdminTabs from "./SuperAdminTabs";
import UserBookings from "./UserBookings";


export default function DashboardContent({ role }) {
  
  if (role === "USER") return <UserBookings />;
  if (role === "SUPER_ADMIN") {
    return <SuperAdminTabs />;
  }

  return <AdminBookings />;
}

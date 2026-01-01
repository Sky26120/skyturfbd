"use client";
import { useState } from "react";
import AdminBookings from "./AdminBooking";
import AdminUsers from "./AdminUsers";


export default function SuperAdminTabs() {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <>
      <div className="dashboard__tabs">
        <button
          className={activeTab === "bookings" ? "active" : "secondary-button"}
          onClick={() => setActiveTab("bookings")}
        >
          All Bookings
        </button>

        <button
          className={activeTab === "users" ? "active" : "secondary-button"}
          onClick={() => setActiveTab("users")}
        >
          All Users
        </button>
      </div>

      {activeTab === "bookings" && <AdminBookings />}
      {activeTab === "users" && <AdminUsers />}
    </>
  );
}

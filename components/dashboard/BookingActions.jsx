"use client";

const STATUS_ORDER = ["pending", "confirmed", "completed", "cancelled"];

export default function BookingActions({ booking, role, refetch }) {
  const canUpdateStatus = ["MODERATOR", "GENERAL_ADMIN", "SUPER_ADMIN"].includes(role);
  if (!canUpdateStatus) return null;

  const currentIndex = STATUS_ORDER.indexOf(booking.status);

  const updateStatus = async (status) => {
    if (status === booking.status) return;

    await fetch(`/api/bookings/${booking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    refetch();
  };

  return (
    <select
      value={booking.status}
      onChange={(e) => updateStatus(e.target.value)}
    >
      {STATUS_ORDER.map((status, index) => (
        <option
          key={status}
          value={status}
          disabled={index < currentIndex}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      ))}
    </select>
  );
}

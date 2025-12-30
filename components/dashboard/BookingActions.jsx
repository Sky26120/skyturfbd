"use client";

export default function BookingActions({ booking, role, refetch }) {
  const canUpdateStatus = ["MODERATOR", "GENERAL_ADMIN", "SUPER_ADMIN"].includes(role);

  if (!canUpdateStatus) return null;

  const updateStatus = async (status) => {
    await fetch(`/api/bookings/${booking._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refetch();
  };

  return (
    <select value={booking.status} onChange={(e) => updateStatus(e.target.value)}>
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}

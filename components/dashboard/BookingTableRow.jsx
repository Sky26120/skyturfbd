"use client";
import BookingActions from "./BookingActions";

export default function BookingTableRow({ booking, role, refetch }) {
  return (
    <tr>
      <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
      <td>{booking.timeSlot}</td>
      <td>{booking.bookingForName}</td>
      <td>{booking.bookingForPhone}</td>
      <td>{booking.arenaName}</td>
      <td>{booking.paidAmount}</td>
      <td>{booking.totalAmount}</td>

      {role !== "USER" && <td>{booking.transactionId || "—"}</td>}
      {role !== "USER" && <td>{booking.status}</td>}
      {role !== "USER" && (
        <td>
          <BookingActions booking={booking} role={role} refetch={refetch} />
        </td>
      )}
    </tr>
  );
}

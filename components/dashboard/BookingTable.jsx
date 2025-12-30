"use client";
import { useSession } from "next-auth/react";
import BookingTableRow from "./BookingTableRow";
import Loading from "../shared/Loading";
import EmptyState from "../shared/Empty";


export default function BookingTable({ bookings, refetch }) {
  const { data: session } = useSession();
  const role = session.user.role;

  if (!bookings) return <Loading />;
  if (!bookings.length) return <EmptyState message="No bookings found" />;

  return (
    <div className="dashboard__booking">
      <p className="dashboard__booking-title">Booking</p>
      <table>
        <div className="dashboard__booking-list">
          <thead>
            <tr>
              <th>Date</th>
              <th>Slot</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Arena</th>
              <th>Advance</th>
              <th>Total</th>
              {role !== "USER" && <th>Transaction ID</th>}
              {role !== "USER" && <th>Status</th>}
              {role !== "USER" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingTableRow
                key={booking._id}
                booking={booking}
                role={role}
                refetch={refetch}
              />
            ))}
          </tbody>
        </div> 
      </table>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import Loading from "../shared/Loading";


export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings?scope=self");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("User bookings error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <Loading />;
  if (!bookings.length) return <p className="dashboard__booking-label">No bookings</p>;

  return <BookingTable bookings={bookings} refetch={() => {}} />;
}

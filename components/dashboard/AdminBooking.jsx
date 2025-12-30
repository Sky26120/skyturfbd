"use client";
import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import Loading from "../shared/Loading";


export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Admin bookings error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Loading />;

  return <BookingTable bookings={bookings} refetch={fetchBookings} />;
}

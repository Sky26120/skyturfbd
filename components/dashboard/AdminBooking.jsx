"use client";
import { useEffect, useState } from "react";
import BookingTable from "./BookingTable";
import Loading from "../shared/Loading";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/bookings");

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();

      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(sorted);
      setFilteredBookings(sorted);
    } catch (err) {
      console.error("Admin bookings error:", err);
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);


  useEffect(() => {
    if (!selectedDate) {
      setFilteredBookings(bookings);
      return;
    }

    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt)
        .toISOString()
        .split("T")[0];

      return bookingDate === selectedDate;
    });

    setFilteredBookings(filtered);
  }, [selectedDate, bookings]);

  if (loading) return <Loading />;

  return (
    <>
      <div className="dashboard__filter">
        <label>Filter by date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {selectedDate && (
          <button className="tertiary-button" onClick={() => setSelectedDate("")}>
            Clear
          </button>
        )}
      </div>

      <BookingTable
       filteredBookings={filteredBookings}
        refetch={fetchBookings}
      />
    </>
  );
}

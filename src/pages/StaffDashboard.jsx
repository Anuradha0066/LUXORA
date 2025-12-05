import React, { useEffect, useState } from 'react';
import API from '../api';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings');

        if (res.data.success) {
          setBookings(res.data.bookings.reverse());
        } else {
          setError(res.data.message || 'Failed to fetch bookings');
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      }
    };

    fetchBookings();
    const interval = setInterval(fetchBookings, 5000); // refetch every 5 sec
  return () => clearInterval(interval);
  }, []);


  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">Customer Bookings</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <table className="w-full border shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-sm">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Room Booked</th>
            <th className="border p-2">Check In</th>
            <th className="border p-2">Check Out</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Booked On</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b._id} className="text-sm text-center">
              <td className="border p-2">{b.guestName || 'Unknown'}</td>
              <td className="border p-2">{b.guestEmail || '-'}</td>
              <td className="border p-2">{b.roomName}</td>

              <td className="border p-2">
                {b.checkIn ? new Date(b.checkIn).toLocaleDateString() : 'Not Set'}
              </td>

              <td className="border p-2">
                {b.checkOut ? new Date(b.checkOut).toLocaleDateString() : 'Not Set'}
              </td>

              <td className="border p-2">₹{b.price}</td>

              <td className="border p-2">
                {b.createdAt ? new Date(b.createdAt).toLocaleString() : '—'}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default StaffDashboard;

import React, { useEffect, useState } from 'react';

const StaffDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('staffToken');
        const res = await fetch('http://localhost:5000/api/staff/bookings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError(data.message || 'Failed to fetch bookings');
        }
      } catch (err) {
        console.error(err);
        setError('Server error');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Service/Room</th>
            <th className="border p-2">Booking Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td className="border p-2">{b.userId?.name || 'Guest'}</td>
              <td className="border p-2">{b.userId?.email || '-'}</td>
              <td className="border p-2">{b.service}</td>
              <td className="border p-2">{new Date(b.bookingDate).toLocaleString()}</td>
              <td className="border p-2">{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffDashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      const token = localStorage.getItem('staffToken');
      if (!token) {
        navigate('/staff-login', { replace: true });
        return;
      }

      try {
        const res = await fetch('http://localhost:5000/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Server returned', res.status);
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        localStorage.removeItem('staffToken'); // remove invalid token
        navigate('/staff-login', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('staffToken');
    navigate('/staff-login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h3 className="text-xl font-bold mb-6">Hotel Staff</h3>
        <nav className="flex flex-col gap-3">
          <button className="text-left py-2 px-3 rounded hover:bg-gray-100">Dashboard</button>
        </nav>
        <div className="mt-6">
          <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">#</th>
                  <th className="border px-2 py-1">Guest</th>
                  <th className="border px-2 py-1">Email</th>
                  <th className="border px-2 py-1">Room</th>
                  <th className="border px-2 py-1">Check-in</th>
                  <th className="border px-2 py-1">Check-out</th>
                  <th className="border px-2 py-1">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id}>
                    <td className="border px-2 py-1">{i + 1}</td>
                    <td className="border px-2 py-1">{b.guest}</td>
                    <td className="border px-2 py-1">{b.email}</td>
                    <td className="border px-2 py-1">{b.room}</td>
                    <td className="border px-2 py-1">{b.checkIn}</td>
                    <td className="border px-2 py-1">{b.checkOut}</td>
                    <td className="border px-2 py-1">₹{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

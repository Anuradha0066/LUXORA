import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert(err?.message || 'Invalid credentials');
      }

      const data = await res.json();
      console.log('Login response:', data);
      // save token
      localStorage.setItem('staffToken', data.token);

      // redirect to dashboard
      navigate('/staff-dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Staff Login</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="staff@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

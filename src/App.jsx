import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RoomDetails from './pages/RoomDetails';
import StaffLogin from './pages/StaffLogin';
import StaffDashboard from './pages/StaffDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Layout } from './components';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with header/footer */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/room/:id" element={<Layout><RoomDetails /></Layout>} />

        {/* Staff routes without header/footer */}
        <Route path="/staff-login" element={<StaffLogin />} />
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CitizenLayout from './layouts/CitizenLayout';
import Dashboard from './pages/citizen/Dashboard';
import PostComplaint from './pages/citizen/PostComplaint';
import TrackVehicle from './pages/citizen/TrackVehicle';
import ServicePayments from './pages/citizen/ServicePayments';
import Checkpoint from './pages/citizen/Checkpoint';

import SupervisorLayout from './layouts/SupervisorLayout';
import Vehicles from './pages/supervisor/Vehicles';
import SupervisorDashboard from './pages/supervisor/Dashboard';
import Complaints from './pages/supervisor/Complaints';
import Attendance from './pages/supervisor/Attendance';

import Analytics from './pages/supervisor/Analytics';
import WealthCenter from './pages/supervisor/WealthCenter';
import MachineryDefect from './pages/supervisor/MachineryDefect';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        
        {/* Citizen Panel Routes */}
        <Route path="/citizen" element={<CitizenLayout />}>
          <Route index element={<Navigate to="/citizen/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="complaint" element={<PostComplaint />} />
          <Route path="track" element={<TrackVehicle />} />
          <Route path="payments" element={<ServicePayments />} />
          <Route path="checkpoint" element={<Checkpoint />} />
        </Route>

        {/* Supervisor Panel Routes */}
        <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route index element={<Navigate to="/supervisor/dashboard" replace />} />
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="wealth" element={<WealthCenter />} />
          <Route path="machinery" element={<MachineryDefect />} />
          <Route path="tracking" element={<TrackVehicle />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;








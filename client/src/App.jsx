import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ReportDetail from './pages/ReportDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/admin/AdminPanel';
import CreateReport from './pages/admin/CreateReport';
import EditReport from './pages/admin/EditReport';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-warm">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports/new"
          element={
            <AdminRoute>
              <CreateReport />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reports/:id/edit"
          element={
            <AdminRoute>
              <EditReport />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/public/Home';
import BuyPage from '../pages/public/BuyPage';
import RentPage from '../pages/public/RentPage';
import ContactUs from '../pages/public/ContactUs';
import PostProperty from '../pages/public/PostProperty';
import PostPropertyForm from '../pages/public/PostPropertyForm';
import WhyInvestPurandar from '../pages/public/WhyInvestPurandar';
import PropertyDetails from '../pages/public/PropertyDetails';
import ProfileLayout from '../pages/profile/ProfileLayout';
import MyProfile from '../pages/profile/MyProfile';
import SavedProperties from '../pages/profile/SavedProperties';
import MyProperties from '../pages/profile/MyProperties';
import Dashboard from '../pages/profile/Dashboard';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PendingProperties from '../pages/admin/PendingProperties';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminProperties from '../pages/admin/AdminProperties';

export default function AppRoutes() {
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/why-invest" element={<WhyInvestPurandar />} />
        <Route path="/post-property" element={<PostProperty />} />
        {!backgroundLocation ? <Route path="/login" element={<Login />} /> : null}
        {!backgroundLocation ? <Route path="/signup" element={<Signup />} /> : null}

        <Route element={<ProtectedRoute />}>
          <Route path="/post-property/form" element={<PostPropertyForm />} />
          <Route path="/profile" element={<ProfileLayout />}>
            <Route index element={<MyProfile />} />
            <Route path="saved" element={<SavedProperties />} />
            <Route path="properties" element={<MyProperties />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiries" element={<Navigate to="/profile/dashboard" replace />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="properties/form" element={<PostPropertyForm />} />
            <Route path="properties/pending" element={<PendingProperties />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {backgroundLocation ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : null}
    </>
  );
}

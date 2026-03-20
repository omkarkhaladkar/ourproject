import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/public/Home';
import BuyPage from '../pages/public/BuyPage';
import RentPage from '../pages/public/RentPage';
import ContactUs from '../pages/public/ContactUs';
import WhyInvestPurandar from '../pages/public/WhyInvestPurandar';
import PropertyDetails from '../pages/public/PropertyDetails';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<BuyPage />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/why-invest" element={<WhyInvestPurandar />} />
            {/* Profile routes handled separately */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

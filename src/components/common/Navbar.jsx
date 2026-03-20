import React, { useState } from 'react';
import { Bell, Bookmark, ChevronDown, Home, Search, Phone, Menu, X, PlusCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import CitySearch from './CitySearch';

const navItems = [
    { label: 'Home', to: '/', icon: Home },
    { label: 'Buy', to: '/buy', icon: Search },
    { label: 'Rent', to: '/rent', icon: Search },
    { label: 'Contact Us', to: '/contact', icon: Phone },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="navbar">
            {/* Main Bar */}
            <div className="navbar-container">
                {/* Logo */}
                <div className="logo-container">
                    <span
                        style={{ fontFamily: "'Caveat', cursive" }}
                        className="logo-urban"
                    >
                        Urban
                    </span>
                    <span className="logo-premier">Premier</span>
                </div>

                {/* City Search Bar */}
                <CitySearch />

                {/* Desktop Nav Links */}
                <div className="desktop-nav">
                    {navItems.map(({ label, to }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {label}
                                    {isActive && (
                                        <div className="nav-indicator" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Right Controls */}
                <div className="navbar-controls">
                    <button className="icon-button">
                        <Bell className="w-[22px] h-[22px]" />
                        <span className="notification-dot"></span>
                    </button>
                    <button className="icon-button mobile-hide-sm">
                        <Bookmark className="w-[22px] h-[22px]" />
                    </button>

                    {/* Sell Property CTA */}
                    <NavLink
                        to="/sell"
                        className="btn-sell"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Sell Property
                    </NavLink>

                    <div className="user-profile">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="User Avatar"
                            className="avatar"
                        />
                        <div className="user-info">
                            <span className="user-name">Jane Doe</span>
                            <span className="user-email">janedoe@example.com</span>
                        </div>
                        <ChevronDown className="chevron-icon" />
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(o => !o)}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="mobile-dropdown">
                    {navItems.map(({ label, to, icon: Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={() => setMobileOpen(false)}
                            className={({ isActive }) =>
                                `mobile-nav-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}

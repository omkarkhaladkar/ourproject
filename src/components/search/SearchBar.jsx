import React from 'react';
import { MapPin, Building, Wallet, User, Bed, SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react';
import './SearchBar.css';

const FilterChip = ({ icon: Icon, label, hasClose, hasDropdown, active }) => {
    return (
        <div className={`filter-chip ${active ? 'active' : ''}`}>
            <Icon className="icon" />
            <span>{label}</span>
            {hasClose && (
                <button className="btn-close">
                    <X className="w-[14px] h-[14px]" />
                </button>
            )}
            {hasDropdown && (
                <ChevronDown className="chevron-down" />
            )}
        </div>
    );
};

export default function SearchBar() {
    return (
        <div className="search-bar">
            {/* Scrollable Filters Row */}
            <div className="filter-row scrollbar-hide">
                <FilterChip icon={MapPin} label="Budva, Montenegro" hasClose active />
                <FilterChip icon={Building} label="Apartment, House" hasDropdown />
                <FilterChip icon={Wallet} label="$100K–200K" hasClose />
                <FilterChip icon={User} label="3 persons" hasDropdown />
                <FilterChip icon={Bed} label="2 bedrooms" hasDropdown />
            </div>

            {/* Right Action Buttons */}
            <div className="search-actions">
                <button className="btn-icon">
                    <SlidersHorizontal className="w-[18px] h-[18px]" />
                </button>
                <button className="btn-search">
                    <Search className="w-4 h-4 text-white" />
                    <span>Search</span>
                </button>
            </div>
        </div>
    );
}

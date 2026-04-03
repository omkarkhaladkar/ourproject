import React from 'react';
import { Settings2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Add Property', to: '/admin/properties/form' },
  { label: 'Projects', to: '/admin/projects' },
  { label: 'Add Project', to: '/admin/add-project' },
  { label: 'Blogs', to: '/admin/blogs' },
  { label: 'Users', to: '/admin/users' },
  { label: 'Properties', to: '/admin/properties' },
  { label: 'Approval', to: '/admin/properties/pending' },
];

export default function AdminFeatureNav() {
  return (
    <div className="admin-feature-nav">
      <div className="admin-feature-nav-title"><Settings2 className="w-4 h-4" /> Admin Features</div>
      <div className="admin-feature-nav-links">
        {items.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === '/admin'} className={({ isActive }) => `admin-feature-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

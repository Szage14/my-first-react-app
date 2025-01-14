import React from 'react';

export default function Drawer({ username, photoUrl, email }) {
  const defaultPhotoUrl = '/assets/user.png';

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <img src={photoUrl || defaultPhotoUrl} alt="Profile" className="w-16 h-16 rounded-full mx-auto object-cover" />
          </li>
          <li>
            <span className="text-center block mt-2">{username}</span>
          </li>
          <li>
            <span className="text-center block mt-2">{email}</span>
          </li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  );
}
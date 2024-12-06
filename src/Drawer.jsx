import React, { useEffect, useState } from 'react';

export default function Drawer({ username, photoUrl, email }) {
  const defaultPhotoUrl = '/assets/user.png';
  const [user, setUser] = useState({ username: '', email: '', photoUrl: defaultPhotoUrl });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        username: userData.username,
        email: userData.email,
        photoUrl: userData.photoUrl || defaultPhotoUrl,
      });
    }
  }, []);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Drawer content remains unchanged */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <img src={user.photoUrl} alt="Profile" className="w-16 h-16 rounded-full mx-auto" />
          </li>
          <li>
            <span className="text-center block mt-2">{user.username}</span>
          </li>
          <li>
            <span className="text-center block mt-2">{user.email}</span>
          </li>
          <li>
            <a href="/logout">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Drawer({ username, photoUrl, email }) {
  const defaultPhotoUrl = 'src/assets/user.png';
  const [user, setUser] = useState({ username: 'Guest', email: '', photoUrl: defaultPhotoUrl });
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

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
            <img src={user.photoUrl} alt="Profile" className="w-24 h-24 rounded-full mx-auto object-cover" onError={(e) => { e.target.src = defaultPhotoUrl; }} />
          </li>
          <li>
            <span className="text-center block mt-2">{user.username}</span>
          </li>
          <li>
            <span className="text-center block mt-2">{user.email}</span>
          </li>
          <li>
            <button onClick={handleLogout} className="btn btn-danger w-full">Log out</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
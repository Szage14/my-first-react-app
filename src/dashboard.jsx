import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({
    username: '',
    email: '',
  });
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch user data from local storage or API
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      // Show toast notification if redirected from login
      if (location.state && location.state.fromLogin) {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000); // Hide toast after 3 seconds
      }
    } else {
      navigate('/login');
    }
  }, [navigate, location]);

  const handleLogout = () => {
    // Clear user data and JWT from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Login successful!</span>
          </div>
        </div>
      )}
      <div className="p-6 max-w-4xl w-full bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <p className="text-lg text-neutral mb-6">
          Welcome, {user.username}! Here is your dashboard.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Profile</h2>
            <p className="text-neutral mb-2">Username: {user.username}</p>
            <p className="text-neutral mb-2">Email: {user.email}</p>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Statistics</h2>
            <p className="text-neutral mb-2">Sales: $10,000</p>
            <p className="text-neutral mb-2">Customers: 200</p>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Tasks</h2>
            <ul className="list-disc list-inside text-neutral">
              <li>Review sales report</li>
              <li>Update inventory</li>
              <li>Schedule staff meeting</li>
            </ul>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Notifications</h2>
            <ul className="list-disc list-inside text-neutral">
              <li>New customer feedback</li>
              <li>Stock running low on item #123</li>
              <li>Monthly performance review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
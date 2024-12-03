import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

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

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
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
      <div className="p-12 max-w-6xl w-full bg-white rounded-lg shadow-md">
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
            <h2 className="text-2xl font-bold mb-2 text-aqua">Profile</h2>
            <p className="text-aqua mb-2">Username: {user.username}</p>
            <p className="text-aqua mb-2">Email: {user.email}</p>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2">Statistics</h2>
            <Line data={data} />
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2 text-aqua">Orders</h2>
            <ul className="list-disc list-inside text-aqua">
              <li>Order #12345</li>
              <li>Order #12346</li>
              <li>Order #12347</li>
            </ul>
          </div>
          <div className="bg-base-200 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-2 text-aqua">Inventory</h2>
            <ul className="list-disc list-inside text-aqua">
              <li>Item #123 - 50 units</li>
              <li>Item #124 - 30 units</li>
              <li>Item #125 - 20 units</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
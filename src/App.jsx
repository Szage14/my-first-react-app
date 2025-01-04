import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './login';
import Register from './Register';
import Welcome from './Welcome';
import Dashboard from './dashboard';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: '', photoUrl: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from Strapi backend
    const fetchUserData = async () => {
      try {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
          throw new Error('No JWT token found');
        }

        const response = await fetch('http://localhost:1337/api/users/me?populate=*', {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const photoUrl = data.profile && data.profile.url ? `http://localhost:1337${data.profile.url}` : '';
          setIsLoggedIn(true);
          setUser({ 
            username: data.username, 
            photoUrl: photoUrl,
            email: data.email
          });
          localStorage.setItem('user', JSON.stringify({
            username: data.username,
            email: data.email,
            photoUrl: photoUrl
          }));
        } else {
          console.error('Failed to fetch user data:', response.statusText);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <Header 
        username={user.username} 
        photoUrl={user.photoUrl} 
        email={user.email}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute component={Dashboard} isLoggedIn={isLoggedIn} />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

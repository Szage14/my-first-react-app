================================================
File: /README.md
================================================
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


================================================
File: /eslint.config.js
================================================
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]


================================================
File: /index.html
================================================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


================================================
File: /package.json
================================================
{
  "name": "my-react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.0",
    "@heroicons/react": "^2.2.0",
    "chart.js": "^4.4.7",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "daisyui": "^4.12.14",
    "eslint": "^9.15.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.15",
    "vite": "^6.0.1"
  }
}


================================================
File: /postcss.config.cjs
================================================
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}


================================================
File: /tailwind.config.cjs
================================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["luxury"], // Set the theme to luxury
  },
}



================================================
File: /vite.config.js
================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


================================================
File: /src/App.jsx
================================================
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
          const photoUrl = data.photo && data.photo.url ? `http://localhost:1337${data.photo.url}` : '';
          setIsLoggedIn(true);
          setUser({ 
            username: data.username, 
            photoUrl: photoUrl,
            email: data.email
          });
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


================================================
File: /src/Drawer.jsx
================================================
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

================================================
File: /src/Footer.jsx
================================================
function Footer() {
  return (
    <footer className="footer footer-center  text-base-content p-4">
      <aside>
        <p>&copy; {new Date().getFullYear()} Wing On. All rights reserved.</p>
      </aside>
    </footer>
  );
}

export default Footer;

================================================
File: /src/Header.jsx
================================================
import { Link } from 'react-router-dom';
import Profile from './Drawer';

export default function Header({ username, photoUrl, email }) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Wing On</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Create Account</Link></li>
          <li>
            <label htmlFor="my-drawer-4" className="normal-case cursor-pointer">Profile</label>
            <Profile username={username} photoUrl={photoUrl} email={email} />
          </li>
        </ul>
      </div>
    </div>
  );
}

================================================
File: /src/Login.jsx
================================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Store user data and JWT in local storage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('jwt', data.jwt);
        // Redirect to dashboard with state indicating successful login
        navigate('/dashboard', { state: { fromLogin: true } });
      } else {
        // Handle specific error messages
        if (data.message && data.message[0] && data.message[0].messages && data.message[0].messages[0]) {
          const errorMessage = data.message[0].messages[0].message;
          setError(errorMessage);
        } else {
          setError('Login failed');
        }
        console.error('Login failed:', data);
        // Clear the error message after 3 seconds
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('An error occurred:', error);
      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 mb-16">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="identifier">
              Username or Email
            </label>
            <input
              className="input input-bordered w-full"
              id="identifier"
              type="text"
              placeholder="Username or Email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered w-full"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="ml-2 text-sm text-neutral">Show Password</span>
              </label>
            </div>
          </div>
          {error && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              className="btn btn-secondary w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Don't have an account? <a href="/register" className="textarea-ghost"><b>Create Account</b></a>
          </p>
        </div>
      </div>
    </div>
  );
}

================================================
File: /src/ProtectedRoute.jsx
================================================
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

================================================
File: /src/PublicRoute.jsx
================================================
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;

================================================
File: /src/Register.jsx
================================================
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful!');
        console.log('Registration successful:', data);
        // Delay the redirection to the login page
        setTimeout(() => {
          navigate('/login');
        }, 2000); // 2 seconds delay
      } else {
        setError(data.message || 'Registration failed');
        console.error('Registration failed:', data);
        // Delay the refresh of the registration component
        setTimeout(() => {
          navigate('/register', { replace: true });
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('An error occurred:', error);
      // Delay the refresh of the registration component
      setTimeout(() => {
        navigate('/register', { replace: true });
      }, 2000); // 2 seconds delay
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 mb-16">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="input input-bordered w-full"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="input input-bordered w-full"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered w-full"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="input input-bordered w-full"
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <span className="ml-2 text-sm text-neutral">Show Password</span>
              </label>
            </div>
          </div>
          {error && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            </div>
          )}
          {success && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>{success}</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-center">
            <button
              className="btn btn-secondary w-full"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral">
            Already have an account? <a href="/login" className="texarea-ghost"><b>Login</b></a>
          </p>
        </div>
      </div>
    </div>
  );
}

================================================
File: /src/Welcome.jsx
================================================
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="p-12 max-w-2xl w-full bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome, Manager!</h1>
        <p className="text-xl text-neutral mb-8">
          Welcome to the retail store management system. Please log in to access your dashboard or create an account if you don't have one.
        </p>
      </div>
    </div>
  );
}

================================================
File: /src/dashboard.jsx
================================================
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

================================================
File: /src/index.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;

================================================
File: /src/main.jsx
================================================
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);


================================================
File: /src/sample_components/Button.jsx
================================================

function Button() {
  return (<button className="btn">Click me!</button>);
}

export default Button;

================================================
File: /src/sample_components/Card.jsx
================================================
import ProfilePic from './assets/me.jpg';

function Card(){
    return (
        <div className="card">
            <img className='card-image' src={ProfilePic} alt="profile picture" />
            <h2 className='card-title'>Cristian Jay Buquis</h2>
            <p className='card-text'>CSU Main-Student</p>
        </div>
    )
}

export default Card;

================================================
File: /src/sample_components/Food.jsx
================================================

function Food(){

    const food1 = "Pizza";
    const food2 = "Burger";
    const food3 = "Pasta";
    return (
        <div>
            <h1>Food</h1>
            <ul>
                <li>{food1}</li>
                <li>{food2}</li>
                <li>{food3}</li>
            </ul>
        </div>
    )
}

export default Food;

================================================
File: /src/sample_components/List.jsx
================================================
import PropTypes from 'prop-types';

function FruitList({ title, fruits }) {
  return (
    <div>
      <h2>{title}</h2>
      <ol>
        {fruits.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name}: <b>{fruit.calories}</b> <i>calories</i>
          </li>
        ))}
      </ol>
    </div>
  );
}

FruitList.propTypes = {
  title: PropTypes.string.isRequired,
  fruits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired
    })
  ).isRequired
};

function List() {
  const fruits = [
    { id: 1, name: 'Apple', calories: 52 },
    { id: 2, name: 'Banana', calories: 96 },
    { id: 3, name: 'Cherry', calories: 50 },
    { id: 4, name: 'Date', calories: 282 },
    { id: 5, name: 'Elderberry', calories: 73 },
    { id: 6, name: 'Fig', calories: 74 },
    { id: 7, name: 'Grape', calories: 69 }
  ];

  // Sort fruits by name in ascending order
  const sortedByNameAsc = [...fruits].sort((a, b) => a.name.localeCompare(b.name));
  
  // Sort fruits by name in descending order
  const sortedByNameDesc = [...fruits].sort((a, b) => b.name.localeCompare(a.name));
  
  // Sort fruits by calories in ascending order
  const sortedByCaloriesAsc = [...fruits].sort((a, b) => a.calories - b.calories);
  
  // Sort fruits by calories in descending order
  const sortedByCaloriesDesc = [...fruits].sort((a, b) => b.calories - a.calories);

  // Filter fruits with less than 100 calories
  const lowCalFruits = fruits.filter(fruit => fruit.calories < 100);

  // Filter fruits with more than 100 calories
  const highCalFruits = fruits.filter(fruit => fruit.calories > 100);

  return (
    <div>
      <FruitList title="All Fruits (Sorted by Name Ascending)" fruits={sortedByNameAsc} />
      <FruitList title="Low Calorie Fruits (Less than 100 calories)" fruits={lowCalFruits} />
      <FruitList title="High Calorie Fruits (More than 100 calories)" fruits={highCalFruits} />
    </div>
  );
}

export default List;

================================================
File: /src/sample_components/Student.jsx
================================================
import propTypes from 'prop-types';
function Student(props){
    return (
       <div className="student">
              <h2>Name: {props.name}</h2>
              <p>Course: {props.course}</p>
              <p>Age: {props.age}</p>
              <p>Student: {props.isStudent ? "Yes" : "No"}</p>

       </div>
    )
}
Student.propTypes = {
    name: propTypes.string,
    course: propTypes.string,
    age: propTypes.number,
    isStudent: propTypes.bool
}
Student.defaultProps = {
    name: "No name",
    course: "No course",
    age: "No age",
    isStudent: false
}
export default Student;

================================================
File: /src/sample_components/UserGreeting.jsx
================================================
import propTypes from 'prop-types';

function UserGreeting(props) {
    const welcomeMessage = <h1 className="welcome-msg">Welcome back {props.username}!</h1>;
    const loginPrompt = <h1 className="login-prompt">Please sign up.</h1>;

    return (
        props.isLoggedIn ? welcomeMessage : loginPrompt
    );
}
UserGreeting.propTypes = {
    isLoggedIn: propTypes.bool,
    username: propTypes.string
}
UserGreeting.defaultProps = {
    isLoggedIn: false,
    username: 'Guest'
}
export default UserGreeting;


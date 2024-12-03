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
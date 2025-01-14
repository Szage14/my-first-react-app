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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle successful registration
      setSuccess('Account created successfully!');
      setLoading(false);
      navigate('/login');
    } catch (err) {
      // Handle registration error
      setError('Failed to create account');
      setLoading(false);
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
              disabled={loading}
              style={{
                backgroundColor: loading ? '#6c757d' : '', // Set the background color for the disabled state
                color: loading ? '#fff' : '', // Set the text color for the disabled state
                cursor: loading ? 'not-allowed' : 'pointer', // Set the cursor for the disabled state
              }}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>
            {loading && <span className="loading-spinner"></span>}
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
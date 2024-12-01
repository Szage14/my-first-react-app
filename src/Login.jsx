import { useState } from 'react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <div className="p-6 max-w-sm w-full bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-neutral text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="input input-bordered w-full"
              id="username"
              type="text"
              placeholder="Username"
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
          <div className="flex items-center justify-center">
            <button
              className="btn btn-primary w-full"
              type="button"
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
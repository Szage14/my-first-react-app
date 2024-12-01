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
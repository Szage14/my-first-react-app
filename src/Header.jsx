import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Wing On</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Create Account</Link></li>
        </ul>
      </div>
    </div>
  );
}
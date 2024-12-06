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
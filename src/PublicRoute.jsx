import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('jwt');
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;
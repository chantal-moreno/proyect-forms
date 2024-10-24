import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/useAuth';

function ProtectedRoute() {
  const { user, isAuthenticated } = useAuth();
  // console.log(user, isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/home-page" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;

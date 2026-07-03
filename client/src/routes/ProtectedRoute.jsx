import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { token, user } = useAuthStore();
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return <Outlet />;
}

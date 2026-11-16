import { useAuth } from "@/components/providers/auth-provider";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  authRoute = false,
  isAdminRoute = false,
}) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && isAdminRoute && user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  if (!isAuthenticated && !authRoute) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isAuthenticated && authRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

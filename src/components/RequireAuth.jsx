import { useAuth } from "./context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-20 text-gray-500">로딩 중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
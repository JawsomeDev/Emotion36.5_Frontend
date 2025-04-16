import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!loading && !user && !showToast) {
      toast.warn("로그인이 필요합니다");
      setShowToast(true);
    }
  }, [loading, user, showToast]);

  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RequireRegister = () => {
  const { auth } = useAuth();
  return auth?.accessToken ? <Outlet /> : <Navigate to="/signup" />;
};

export default RequireRegister;

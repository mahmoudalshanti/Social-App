import { Navigate, Outlet } from "react-router-dom";
import { useRegister } from "../context/RegisterProvider";

const RequireRegister = () => {
  const { register } = useRegister();
  return register?.accessToken ? <Outlet /> : <Navigate to="/signup" />;
};

export default RequireRegister;

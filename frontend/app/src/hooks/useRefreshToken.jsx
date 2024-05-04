import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import jwt_decode from "jwt-decode";
import { useUser } from "../context/UserProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { dispatch } = useUser();

  const refreshToken = async () => {
    try {
      const response = await axios.get("/refresh", { withCredentials: true });
      const accessToken = await response.data.accessToken;

      setAuth((prev) => {
        return { ...prev, accessToken: accessToken };
      });

      const decode = jwt_decode(accessToken);
      const { UserInfo } = decode;
      dispatch({ type: "setUser", payload: UserInfo });

      return accessToken;
    } catch (err) {
      return null;
    }
  };

  return refreshToken;
};

export default useRefreshToken;

import { useState } from "react";
import axios from "../api/axios";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signIn = async (username, password) => {
    if (!username || !password) return setError("Fields are required");

    try {
      setLoading(true);

      const response = await axios.post(
        "/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const data = await response.data;
      setLoading(false);
      setError(null);
      setSuccess(true);

      return data;
    } catch (err) {
      const axiosError = err;
      console.log(axiosError?.response.status);
      if (axiosError.response.data.message) {
        setError(axiosError.response.data.message);
      } else if (axiosError?.response?.status === 429) {
        setError("Too many requests, Try again after a minute");
      } else {
        setError("No Server Response");
      }
      setLoading(false);
      setSuccess(false);

      return null;
    }
  };

  return [error, isLoading, success, signIn];
};

export default useSignIn;

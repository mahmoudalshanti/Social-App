import { useState } from "react";
import axios from "../api/axios";
function useSignUp() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const signUp = async (
    email,
    username,
    pwd,
    pwdConfirm,
    fName,
    lName,
    picture
  ) => {
    console.log(picture);
    if (!email || !username || !pwd || !pwdConfirm || !fName || !lName) {
      setError("Fields are required");
      return;
    }

    if (pwd !== pwdConfirm) {
      setError("No match between password and confirm password");
      return;
    }

    try {
      setLoading(true);
      if (picture) {
        const response = await axios.post(
          "/register",
          {
            email,
            username,
            password: pwd,
            fName,
            lName,
            profileImage: {
              url: picture,
            },
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const data = await response.data;
        setLoading(false);
        setError(null);
        setSuccess(true);
        return data;
      } else {
        const response = await axios.post(
          "/register",
          {
            email,
            username,
            password: pwd,
            fName,
            lName,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const data = await response.data;
        setLoading(false);
        setError(null);
        setSuccess(true);
        return data;
      }
    } catch (err) {
      const axiosError = err;
      if (axiosError?.response?.status === 429) {
        setError("Too many requests, Try again after a minute");
      } else {
        console.log(err);
        setError(axiosError?.response?.data?.message ?? "Something Error");
      }
      setSuccess(false);
      setLoading(false);

      return null;
    }
  };

  return [isLoading, error, signUp, success];
}

export default useSignUp;

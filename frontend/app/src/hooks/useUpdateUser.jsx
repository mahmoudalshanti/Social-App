import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useUser } from "../context/UserProvider";

const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useUser();
  const updateUser = async ({
    id,
    username,
    email,
    pwd,
    pwdConfirm,
    fName,
    lName,
    profileImg,
    city,
    state,
  }) => {
    if (!id) return setError("No id for user");

    console.log(pwd, pwdConfirm);
    if (pwd && pwdConfirm) {
      if (pwd !== pwdConfirm)
        return setError("No match between password and confirm password");
    }

    try {
      setLoading(true);
      const response = await axiosPrivate.patch("/users/update", {
        id,
        email,
        username,
        password: pwd,
        fName,
        lName,
        profileImg,
        city,
        state,
      });

      setSuccess(true);
      setError(null);
      setLoading(false);

      const data = await response.data;
      dispatch({
        type: "userUpdate",
        payload: { username, password: pwd, email, fName, lName },
      });
      return data;
    } catch (err) {
      const axiosError = err;
      console.log(axiosError.response.data.message);
      if (axiosError.response.status === 400) {
        setError(axiosError.response.data.message ?? "No data for change");
      } else if (axiosError.response.status === 304) {
        setError("Already have it");
      } else if (axiosError.response.status === 406) {
        setError(axiosError.response.data.message ?? "Not followed roles");
      } else {
        setError(axiosError.response.message);
      }

      setSuccess(false);
      setLoading(false);
    }

    return null;
  };

  return [error, isLoading, success, updateUser];
};

export default useUpdateUser;

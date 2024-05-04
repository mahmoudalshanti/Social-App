import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useVerifyFriend = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const verifyFriend = async (idUser, idFriend) => {
    if (!idUser || !idFriend) return setError("please make sure of added");

    try {
      setLoading(true);

      const response = await axiosPrivate.post("/users/verifyfriend", {
        idUser,
        idFriend,
      });
      const data = await response.data;

      setSuccess(true);
      setError(null);
      setLoading(false);

      return data;
    } catch (err) {
      const axiosError = err;
      if (axiosError.response.data.message) {
        setError(axiosError.response.data.message);
      } else {
        setError(axiosError.response.data.message ?? "Something Error");
      }
    }

    setSuccess(false);
    setLoading(false);
  };
  return { error, isLoading, success, verifyFriend };
};

export default useVerifyFriend;

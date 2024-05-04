import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useUser } from "../context/UserProvider";

const useRemoveFriend = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useUser();

  const removeFriend = async (idUser, idFriend) => {
    if (!idUser || !idFriend) return setError("please make sure of added");

    try {
      setLoading(true);

      const response = await axiosPrivate.patch("/users/removefriend", {
        idUser,
        idFriend,
      });
      const data = await response.data;

      dispatch({
        type: "friendsUpdate",
        payload: data.usersFriends,
      });

      setSuccess(true);
      setError(null);
      setLoading(false);

      return data;
    } catch (err) {
      const axiosError = err;
      console.log(axiosError);
      if (axiosError.response.data.message) {
        setError(axiosError.response.data.message);
      } else {
        setError(axiosError.response.data.message ?? "Something Error");
      }
      console.log("error", error);
    }

    setSuccess(false);
    setLoading(false);
  };
  return { error, isLoading, success, removeFriend, setSuccess };
};

export default useRemoveFriend;

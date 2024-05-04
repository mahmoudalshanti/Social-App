import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useUser } from "../context/UserProvider";

const useAddFriend = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useUser();

  const addFriend = async (idUser, idFriend) => {
    if (!idUser || !idFriend) return setError("please make sure of added");

    try {
      setLoading(true);

      const response = await axiosPrivate.post("/users/addfriend", {
        idUser,
        idFriend,
      });
      const data = await response.data;
      setSuccess(true);
      setError(null);
      setLoading(false);

      console.log(data.addFriend);
      dispatch({
        type: "friendsUpdate",
        payload: data.usersFriends,
      });
      return data;
    } catch (err) {
      const axiosError = err;
      console.log(axiosError);
      if (axiosError.response.data.message) {
        setError(axiosError.response.data.message);
      } else if (axiosError.response.status === 304) {
        setError(304);
      } else {
        setError(axiosError.response.data.message ?? "Something Error");
      }
      console.log("error", error);
    }

    setSuccess(false);
    setLoading(false);
  };
  return { error, isLoading, success, addFriend, setSuccess };
};

export default useAddFriend;

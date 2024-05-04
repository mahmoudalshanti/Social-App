import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { useUser } from "../context/UserProvider";

const useNewNof = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { dispatch } = useUser();

  const newNof = async (id, nof) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/users/newnof`, {
        idFriend: id,
        nof,
      });
      const data = await response.data;

      setError(null);
      setSuccess(true);
      // dispatch({ type: "newNof", payload: data.nof });
      setLoading(false);
      return data;
    } catch (err) {
      console.log(err);
      setError(err.response.data.message ?? "Something Error");
      setSuccess(false);
      setLoading(false);
      return null;
    }
  };

  return { error, success, isLoading, newNof };
};

export default useNewNof;

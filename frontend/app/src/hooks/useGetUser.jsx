import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetUser = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get(`/users/${id}`);
      const data = await response.data;
      setError(null);
      setSuccess(true);
      setLoading(false);
      return data?.user;
    } catch (err) {
      setError(err.response.data.message ?? "Something Error");
      setSuccess(false);
      setLoading(false);
      return null;
    }
  };
  return [error, isLoading, success, getUser];
};

export default useGetUser;

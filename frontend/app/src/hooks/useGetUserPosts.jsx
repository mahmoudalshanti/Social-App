import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetUserPosts = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getUserPost = async (id) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get(`/posts/user/${id}`);
      const data = await response.data;

      setSuccess(true);
      setError(null);
      setLoading(false);

      return data;
    } catch (err) {
      const axiosError = err;
      setError(axiosError.response.data.message ?? "Something Error");
      setSuccess(false);
      setLoading(false);

      return null;
    }
  };

  return { error, isLoading, success, getUserPost };
};

export default useGetUserPosts;

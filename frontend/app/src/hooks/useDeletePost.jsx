import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useDeletePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const deletePost = async (id) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.delete(`/posts/${id}`);
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

  return { error, isLoading, success, deletePost };
};

export default useDeletePost;

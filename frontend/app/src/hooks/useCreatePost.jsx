import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useCreatePost = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const createPost = async (formData) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/posts/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.data.post;

      console.log(data);
      setError(null);
      setSuccess(true);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.response.data.message ?? "Something Error");
      setSuccess(false);
      setLoading(false);
      return null;
    }
  };

  return { error, isLoading, success, createPost };
};

export default useCreatePost;

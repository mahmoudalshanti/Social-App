import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useAddMessage = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const addMessage = async (sender, to, text, author) => {
    if (!text) return;
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/messenger`, {
        sender,
        to,
        text,
        author,
      });
      const data = await response.data;

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

  return { error, isLoading, success, addMessage };
};

export default useAddMessage;

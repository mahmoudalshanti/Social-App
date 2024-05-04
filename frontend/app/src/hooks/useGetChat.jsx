import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetChat = () => {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getChat = async (userMessenger, userSender) => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(`/messenger/chat`, {
        userMessenger,
        userSender,
      });

      const data = await response.data;

      setSuccess(true);
      setError(null);
      setLoading(false);

      return data;
    } catch (err) {
      const axiosError = err;
      console.log(err);
      setError(axiosError.response.data.message ?? "Something Error");
      setSuccess(false);
      setLoading(false);

      return null;
    }
  };

  return { error, isLoading, success, getChat };
};

export default useGetChat;

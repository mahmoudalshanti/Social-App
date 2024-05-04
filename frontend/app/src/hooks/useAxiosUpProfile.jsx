// import { useState } from "react";
import { useState } from "react";
import { axiosUpload } from "../api/axios";
import { useRegister } from "../context/RegisterProvider";

const useAxiosUpProfile = (selectedFile) => {
  const [uploadError, setUploadError] = useState(null);
  const [isUploadLoading, setUploadLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const { register } = useRegister();

  axiosUpload.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization)
        config.headers["Authorization"] = `Bearer ${register?.accessToken}`;

      return config;
    },
    (error) => Promise.reject(error)
  );

  const uploadPhoto = async () => {
    try {
      setUploadLoading(true);
      const formData = new FormData();
      formData.append("image", selectedFile);
      await axiosUpload.post("/upload/profile", formData);
      setUploadLoading(false);
      setUploadSuccess(true);
      setUploadError(null);
    } catch (err) {
      const axiosError = err;
      console.log(err);
      if (axiosError?.response?.status === 429) {
        setUploadError("Too many requests, Try again after a minute");
      } else if (axiosError?.response?.status === 406) {
        setUploadError("Photo Not Accept");
      } else if (axiosError?.response?.data?.message) {
        setUploadError(axiosError?.response.data.message);
      } else {
        setUploadError(axiosError.message.data ?? "Something Error");
      }
      setUploadLoading(false);
    }
  };

  return [uploadPhoto, uploadError, isUploadLoading, uploadSuccess];
};

export default useAxiosUpProfile;

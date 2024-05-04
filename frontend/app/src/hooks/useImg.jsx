import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import jwt_decode from "jwt-decode";

const useImg = () => {
  const { auth } = useAuth();
  const decode = jwt_decode(auth.accessToken);
  const imgData = decode?.UserInfo?.profileImage;
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const getImg = async () => {
      if (!imgData) {
        return null; // No image data available
      }

      if (imgData.url) {
        return imgData.url;
      }

      const { mimetype, data } = imgData;

      const base64String = btoa(
        new Uint8Array(data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      return `data:${mimetype};base64,${base64String}`;
    };

    getImg().then((data) => setImageData(data));
  }, [imgData]);

  return { imageData };
};

export default useImg;

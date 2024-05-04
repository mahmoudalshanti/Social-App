import useAxiosUpProfile from "../../hooks/useAxiosUpProfile";
import user from "../../imgs/user.png";
import useInputs from "../../hooks/useInputs";
import { useState } from "react";
import Success from "../../components/Success";
import Loading from "../../components/Loading";

const UploadProfileImage = () => {
  const [selectedFile, setSelectedFile] = useInputs();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [uploadPhoto, uploadError, isUploadLoading, uploadSuccess] =
    useAxiosUpProfile(selectedFile);

  const handleUpload = async () => {
    await uploadPhoto();
  };

  const handleImageChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  console.log(imagePreview);
  let content;
  if (uploadSuccess) {
    content = <Success />;
  } else {
    content = (
      <main className="signup">
        <section className="upload">
          <h3> Upload Profile photo</h3>
          <div className={"bar1 success"}></div>
          <div className={uploadSuccess ? "bar2 success" : "bar2"}></div>
          {isUploadLoading ? (
            <Loading zoom={"0.3"} />
          ) : (
            uploadError && (
              <p className="msg" style={{ marginBottom: "20px" }}>
                {uploadError}
              </p>
            )
          )}
          <div className="circle">
            {!selectedImage ? (
              <img src={user} />
            ) : (
              <img src={imagePreview} alt="" />
            )}
          </div>
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleUpload} className="upload">
            upload
          </button>
        </section>
      </main>
    );
  }

  return content;
};

export default UploadProfileImage;

import { useUser } from "../../../context/UserProvider";
import userImg from "../../../imgs/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import useCreatePost from "../../../hooks/useCreatePost";
import Loading from "../../../components/Loading";
import ContentPublished from "../../../components/ContentPublished";
const Published = () => {
  const { user } = useUser();
  const [image, setImage] = useState([]);
  const [text, setText] = useState("");
  const { error, isLoading, success, createPost } = useCreatePost();
  const refText = useRef();

  const handelPost = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("text", text);
    await createPost(formData);
  };

  if (success) window.location.reload();

  return (
    <main className="published">
      {isLoading ? <Loading /> : error && <h1 className="wrrPost">{error}</h1>}
      <section className="addPost">
        <div className="imgAuthor">
          <img
            src={user?.profileImage?.url ? user?.profileImage?.url : userImg}
            alt=""
          />
        </div>
        <div className="addContent">
          <div className="inMind">
            <input
              type="text"
              autoComplete="off"
              placeholder="What do you in mind?"
              onChange={(e) => setText(e.target.value)}
              ref={refText}
            />
          </div>
          <div className="addImage">
            <FontAwesomeIcon className="icon" icon={faImage} />
            <input
              type="file"
              onChange={(event) => setImage(event.target.files[0])}
            />
          </div>
          <button onClick={handelPost}>Add Post</button>
        </div>
      </section>
      <section className="contentPublished">
        <ContentPublished />
      </section>
    </main>
  );
};

export default Published;

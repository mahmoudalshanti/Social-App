import { useEffect, useRef, useState } from "react";
import useGetPost from "../hooks/useGetPost";
import { useParams } from "react-router-dom";
import userImg from "../imgs/user.png";
import { useUser } from "../context/UserProvider";
import io from "socket.io-client";
import useNewNof from "../hooks/useNewNof";

const socket = io(`http://localhost:7000`);

const FriendPost = () => {
  const { getPost } = useGetPost();
  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentRef = useRef();
  const { newNof } = useNewNof();
  const { id } = useParams();
  const { user } = useUser();

  useEffect(() => {
    getPost(id).then((data) => setPost(data));

    socket.emit("join_Comment", id);

    socket.on("receive_comment", (data) => {
      setComments(data);
    });

    return () => {
      socket.off("receive_comment");
    };
  }, []);

  const handelComment = async () => {
    socket.emit("add_comment", {
      username: user.username,
      image: user.profileImage,
      room: id,
      comment,
    });

    if (user.id !== post.user) {
      socket.emit("add_NOF", {
        room: post.user,
        message: `${user.username} add comment `,
      });

      await newNof(post.user, `${user.username} add comment `);
    }

    commentRef.current.value = "";
  };

  return (
    <main className="postFriend">
      <div className="userPost">
        <img src={post?.author?.image ? post?.author?.image : userImg} alt="" />
        <p>{user?.id === post?.user ? "You" : post?.author?.username}</p>
      </div>
      <div className="infoPost">
        {post.text && <p>{post.text}</p>}
        {post.media && <img src={post.media} />}
      </div>
      <input
        ref={commentRef}
        type="text"
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handelComment}>Add Comment</button>
      {comments.length
        ? comments.map((comment) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="box">
                <div className="div">
                  <img src={comment.image.url} />
                  <p>{comment.username}</p>
                </div>
                <p>{comment.comment}</p>
              </div>
            );
          })
        : post?.comments?.length &&
          post?.comments?.map((comment) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="box">
                <div className="div">
                  <img src={comment.image.url} />
                  <p>{comment.username}</p>
                </div>
                <p>{comment.comment}</p>
              </div>
            );
          })}
    </main>
  );
};

export default FriendPost;

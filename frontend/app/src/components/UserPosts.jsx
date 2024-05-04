import { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import useGetUserPosts from "../hooks/useGetUserPosts";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import useDeletePost from "../hooks/useDeletePost";

const UserPosts = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);

  const { error, isLoading, getUserPost } = useGetUserPosts();
  const navigate = useNavigate();
  const { isLoading: loadingDelete, success, deletePost } = useDeletePost();
  useEffect(() => {
    getUserPost(user.id).then((data) => setPosts(data));
  }, []);

  const handelDelete = async (id) => {
    await deletePost(id);
  };

  if (success) window.location.reload();

  return (
    <main className="userPosts">
      <h1>My Posts</h1>
      <div className="posts">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          posts.map((post) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div key={post._id}>
                <div
                  onClick={() => navigate(`/content/posts/${post._id}`)}
                  className="box">
                  {post.text && <p>{post.text}</p>}
                  {post.media && <img src={post.media} />}
                  <br />
                </div>
                {loadingDelete ? (
                  <Loading />
                ) : (
                  <button
                    onClick={() => handelDelete(post._id)}
                    className="DeletePost">
                    Delete
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default UserPosts;

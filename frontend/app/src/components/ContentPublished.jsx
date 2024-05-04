import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const ContentPublished = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosPrivate.get("/posts/getfollwedposts");
        const data = await response.data;
        setPosts(data.getPosts);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <h1 className="wrrPost">{error}</h1>
      ) : (
        posts.map((post) => {
          return (
            <div
              onClick={() => navigate(`/content/posts/${post._id}`)}
              key={post._id}
              className="box">
              <div className="upper">
                <img src={post.author.image} alt="" />
                <p>{post.author.username}</p>
              </div>
              <div className="lower">
                {post.text && <p>{post.text}</p>}
                {post.media && <img src={post.media} />}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ContentPublished;

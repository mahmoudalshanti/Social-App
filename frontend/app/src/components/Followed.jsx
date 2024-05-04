import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useUser } from "../context/UserProvider";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import userImg from "../imgs/user.png";

const Followed = () => {
  const { user } = useUser();
  const [followed, setFollowed] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowed = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(`/users/followed/${user.id}`);
        const data = await response.data;
        setFollowed(data.friends);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    getFollowed();
  }, []);

  const handelClick = async (id) => {
    navigate(`/content/profile/${id}`);
  };

  return (
    <div className="friends">
      <p>Followed</p>
      <div className="boxFriend">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <h1 className="errorFriend">{error}</h1>
        ) : (
          followed?.map((friend) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div
                onClick={() => handelClick(friend._id)}
                key={friend._id}
                className="box">
                <p>
                  {friend.fName.toUpperCase()} {friend.lName.toUpperCase()}{" "}
                </p>
                <div>
                  {" "}
                  {friend && (
                    <img
                      src={
                        friend?.profileImage?.url
                          ? friend?.profileImage.url
                          : userImg
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Followed;

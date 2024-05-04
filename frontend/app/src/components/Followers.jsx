import { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import userImg from "../imgs/user.png";

import Loading from "./Loading";

const Followers = () => {
  const { user } = useUser();
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const getFollowers = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(`/users/followers/${user.id}`);
        const data = await response.data;
        setFollowers(data.followers);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    getFollowers();
  }, []);

  const handelClick = async (id) => {
    navigate(`/content/profile/${id}`);
  };

  return (
    <div style={{ marginTop: "100px" }} className="friends">
      <p>Followers</p>
      <div className="boxFriend">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <h1 className="errorFriend">{error}</h1>
        ) : (
          followers?.map((friend) => {
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

export default Followers;

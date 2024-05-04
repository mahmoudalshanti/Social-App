/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useGetUser from "../hooks/useGetUser";
import userImg from "../imgs/user.png";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useAddFriend from "../hooks/useAddFriend";
import { useUser } from "../context/UserProvider";
import useRemoveFriend from "../hooks/useRemoveFriend";

import io from "socket.io-client";
import useNewNof from "../hooks/useNewNof";
const socket = io(`http://localhost:7000`);

const FriendProfile = () => {
  const [userPrivate, setUserPrivate] = useState({});
  const [follow, setFollow] = useState(false);
  const { id } = useParams();
  const { user } = useUser();
  const { newNof } = useNewNof();
  const [error, isLoading, success, getUser] = useGetUser();
  const { isLoading: addLoading, addFriend } = useAddFriend();
  const navigate = useNavigate();
  const { isLoading: removeLoading, removeFriend } = useRemoveFriend();

  useEffect(() => {
    const findFollow = user.friends.find((idF) => idF === id);
    if (findFollow) {
      setFollow(true);
    } else {
      setFollow(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (id === user.id) navigate("/content/profile");

  const handelAddFriend = async () => {
    socket.emit("add_NOF", {
      room: id,
      message: `${user.username} follow you`,
    });
    const idUser = user.id;
    const idFriend = id;
    await addFriend(idUser, idFriend);
    await newNof(idFriend, `${user.username} follow you`);
    setFollow(true);
  };

  const handelRemoveFriend = async () => {
    const idUser = user.id;
    const idFriend = id;
    await removeFriend(idUser, idFriend);
    setFollow(false);
  };

  useEffect(() => {
    getUser(id).then((data) => setUserPrivate(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return error ? (
    <h1 style={{ color: "#fff" }}>No User Found</h1>
  ) : isLoading ? (
    <Loading />
  ) : (
    <main className="profile">
      <section className="imgName">
        <div className="img">
          <img
            src={
              userPrivate?.profileImage?.url
                ? userPrivate?.profileImage?.url
                : userImg
            }
            alt=""
          />
        </div>
        <p className="username">username: {userPrivate?.username}</p>
        <p className="name">
          Name: {userPrivate?.fName + " " + userPrivate?.lName}
        </p>
        {follow ? (
          removeLoading ? (
            <Loading />
          ) : (
            <button className="sign-button" onClick={handelRemoveFriend}>
              UnFollow
            </button>
          )
        ) : addLoading ? (
          <Loading />
        ) : (
          <button className="sign-button" onClick={handelAddFriend}>
            Follow
          </button>
        )}
      </section>
    </main>
  );
};

export default FriendProfile;

/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useUser } from "../../../context/UserProvider";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../../../hooks/useGetUser";
import io from "socket.io-client";

const socket = io(`http://localhost:7000`);

const Aside = () => {
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);
  const [friendsIsOpen, setFriendsIsOpen] = useState(false);
  const [NonfictionIsOpen, setNonfictionIsOpen] = useState(false);
  const { user } = useUser();
  const [Nof, setNof] = useState([]);
  const [NofSocket, setNofSocket] = useState([]);
  const navigate = useNavigate();
  const [error, isLoading, success, getUser] = useGetUser(user.id);

  console.log(Nof);
  useEffect(() => {
    socket.emit("join_NOF", user.id);

    getUser(user.id).then((data) => setNof(data.Nof ?? []));

    socket.on("receive_NOF", (data) => {
      setNofSocket(data);
    });

    return () => {
      socket.off("receive_NOF");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let content = (
    <main className="aside">
      <div className="settings">
        <p onClick={() => setSettingsIsOpen((prev) => !prev)}>Settings</p>
        {settingsIsOpen && (
          <>
            <Link className="re" to={"update-email"}>
              Re-Email
            </Link>
            <Link className="re" to={"update-username"}>
              Re-Username
            </Link>
            <Link className="re" to={"update-password"}>
              Re-Password
            </Link>
            <Link className="re" to={"update-name"}>
              Re-Name
            </Link>
          </>
        )}
      </div>
      <div className="Friends">
        <p onClick={() => setFriendsIsOpen((prev) => !prev)}>Online Friends</p>
        {friendsIsOpen && <span>No Fiends Online</span>}
      </div>
      <div className="Nof">
        <p onClick={() => setNonfictionIsOpen((prev) => !prev)}>Nonfiction</p>
        {NonfictionIsOpen &&
          (NofSocket.length ? (
            // eslint-disable-next-line react/jsx-key
            NofSocket?.map((nf) => <span className="re">{nf}</span>)
          ) : // eslint-disable-next-line react/jsx-key
          Nof.length ? (
            // eslint-disable-next-line react/jsx-key
            Nof?.map((nf) => <span className="re">{nf}</span>)
          ) : (
            <span className="re">No Nof yet</span>
          ))}
      </div>
      <div className="Posts">
        <p>
          {" "}
          <p onClick={() => navigate("/content/posts")}>Posts</p>
        </p>
      </div>
      <div className="messenger">
        <p onClick={() => navigate("/content/messenger")}>Messenger</p>
      </div>
    </main>
  );
  return content;
};

export default Aside;

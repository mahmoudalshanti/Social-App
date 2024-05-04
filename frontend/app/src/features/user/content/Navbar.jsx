import { Outlet, useNavigate, useParams } from "react-router-dom";
import Logo from "../../../components/Logo";
import userImg from "../../../imgs/user.png";
import { useUser } from "../../../context/UserProvider";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import useImg from "../../../hooks/useImg";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [usersFind, setUsersFind] = useState([]);
  const [focusSearch, setFocusSearch] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  // const { imageData } = useImg();
  const handelProfile = () => {
    navigate("/content/profile");
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        const data = await response.data;
        setUsers(data.users);
      } catch (err) {
        navigate("/signup");
      }
    };

    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handelSearch = async (word) => {
    const findUser = users.filter((user) => user.username.includes(word));

    if (word) {
      setFocusSearch(true);
      setUsersFind(findUser);
    } else {
      setFocusSearch(false);
      setUsersFind([]);
    }

    return;
  };

  let status = false;

  if (
    window.location.href === `http://localhost:5173/content/profile` ||
    window.location.href === `http://localhost:5173/content/profile/${id}` ||
    window.location.href === `http://localhost:5173/content/posts/${id}` ||
    window.location.href === `http://localhost:5173/content/posts`
  ) {
    status = true;
  }

  let content = (
    <>
      <main className="Navbar">
        <div className="logo" onClick={() => navigate("/content")}>
          <Logo classType={"logo-navbar"} />
        </div>
        {!status && (
          <div className="search">
            <input
              onChange={(e) => handelSearch(e.target.value)}
              onClick={() => setFocusSearch(true)}
              type="text"
              placeholder="search about friends"
            />

            {focusSearch && (
              <div className="searchBox">
                {usersFind.map((user) => {
                  // eslint-disable-next-line react/jsx-key
                  return (
                    <div
                      onClick={() => navigate(`/content/profile/${user._id}`)}
                      key={user._id}
                      className="box">
                      <div>
                        {" "}
                        <img
                          src={
                            user?.profileImage?.url
                              ? user.profileImage.url
                              : userImg
                          }
                          alt=""
                        />
                      </div>
                      <p>{user.username}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div onClick={handelProfile} className="theSide">
          <p> {user?.fName.toUpperCase()} </p>
          <p className="img">
            <img
              src={user.profileImage?.url ? user.profileImage?.url : userImg}
              alt=""
            />
          </p>
        </div>
      </main>
      <Outlet />
    </>
  );
  return content;
};

export default Navbar;

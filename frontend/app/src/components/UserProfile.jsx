import { useUser } from "../context/UserProvider";
// import useImg from "../hooks/useImg";
import userImg from "../imgs/user.png";
import Followed from "./Followed";
import Followers from "./Followers";

const UserProfile = () => {
  const { user } = useUser();
  // const { imageData } = useImg();

  return (
    <main className="profile">
      <section className="imgName">
        <div className="img">
          <img
            src={user?.profileImage?.url ? user?.profileImage?.url : userImg}
            alt=""
          />
        </div>
        <p className="email">email : {user.email}</p>
        <p className="username">username: {user.username}</p>
        <p className="name">Name: {user.fName + " " + user.lName}</p>
      </section>
      <section className="info">
        <Followed />
        <Followers />
      </section>
    </main>
  );
};

export default UserProfile;

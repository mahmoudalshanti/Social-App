import { useEffect, useState } from "react";
import useGetCross from "../hooks/useGetCross";
import { useUser } from "../context/UserProvider";
import Loading from "../components/Loading";
import userImg from "../imgs/user.png";

// eslint-disable-next-line react/prop-types
const AsideMessenger = ({ setMessenger }) => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const { isLoading, getCross } = useGetCross();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getCross(user.id);
      setUsers(data.users);
    };
    fetchUser();
  }, []);

  const handelClick = (id) => {
    setMessenger(id);
  };
  return (
    <main className="aside">
      {isLoading ? (
        <Loading />
      ) : (
        users?.map((user) => {
          // eslint-disable-next-line react/jsx-key
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              key={user._id}
              onClick={() => handelClick(user._id)}
              className="box">
              <img
                src={
                  user?.profileImage?.url ? user?.profileImage?.url : userImg
                }
                alt=""
              />
              <p>{user.fName}</p>
            </div>
          );
        })
      )}
    </main>
  );
};

export default AsideMessenger;

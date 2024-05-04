import { useParams } from "react-router-dom";
import FriendProfile from "../../../components/FriendProfile";
import UserProfile from "../../../components/UserProfile";

const Profile = () => {
  const { id } = useParams();

  let content;
  if (id) {
    content = <FriendProfile />;
  } else {
    content = <UserProfile />;
  }
  return content;
};

export default Profile;

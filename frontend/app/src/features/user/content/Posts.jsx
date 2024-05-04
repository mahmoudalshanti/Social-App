import { useParams } from "react-router-dom";
import FriendPost from "../../../components/FriendPost";
import UserPosts from "../../../components/UserPosts";

const Posts = () => {
  const { id } = useParams();

  let content;
  if (id) {
    content = <FriendPost />;
  } else {
    content = <UserPosts />;
  }
  return content;
};

export default Posts;

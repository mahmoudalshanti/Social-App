import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Button = ({ classType, word, to }) => {
  return (
    <Link to={to} className={classType}>
      {word}
    </Link>
  );
};

export default Button;

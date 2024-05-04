import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <main className="signup">
      <section>
        <p className="congrats">
          Congrats! You have Tag account,
          <br /> back to{" "}
          <Link to={"/signin"} className="u">
            Sign in
          </Link>
        </p>
        <FontAwesomeIcon className="correct" icon={faCheck} />
      </section>
    </main>
  );
};

export default Success;

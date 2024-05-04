import Logo from "../../components/Logo";
import Username from "../../components/Username";
import Password from "../../components/Password";
import useInputs from "../../hooks/useInputs";
import useSignIn from "../../hooks/useSignIn";
import { useAuth } from "../../context/AuthProvider";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useUser } from "../../context/UserProvider";

const SignIn = () => {
  const [username, setUsername, pwd, setPwd] = useInputs();
  const [error, isLoading, , signIn] = useSignIn();
  const { setAuth } = useAuth();
  const { dispatch } = useUser();

  const navigate = useNavigate();

  const handelSubmit = async () => {
    const data = await signIn(username, pwd);
    if (data) {
      setAuth({ accessToken: data.accessToken });
      const decode = jwt_decode(data.accessToken);
      const { UserInfo } = decode;
      dispatch({ type: "setUser", payload: UserInfo });
      navigate("/content");
      return;
    }
    return;
  };
  let content;
  content = (
    <main className="signin">
      <section>
        <div className="logo">
          <Logo classType={"logo-signin"} />
        </div>
        <div className="info">
          {isLoading ? (
            <Loading zoom={"0.5"} />
          ) : (
            error && <p className="msg">{error}</p>
          )}
        </div>

        <div className="inp">
          <Username setUsername={setUsername} disable={true} />
          <Password setPwd={setPwd} disable={true} />
          <button className="sign-button" onClick={handelSubmit}>
            Sign in
          </button>
        </div>
      </section>
    </main>
  );
  return content;
};

export default SignIn;

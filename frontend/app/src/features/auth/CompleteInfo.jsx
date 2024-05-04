import useInputs from "../../hooks/useInputs";
import { useRegister } from "../../context/RegisterProvider";
import jwt_decode from "jwt-decode";
import useSignUp from "../../hooks/useSignUp";
import Username from "../../components/Username";
import Password from "../../components/Password";
import ConfirmPassword from "../../components/ConfirmPassword";
import Success from "../../components/Success";
import Loading from "../../components/Loading";

const CompleteInfo = () => {
  const { register } = useRegister();
  const [
    username,
    setUsername,
    pwd,
    setPwd,
    focusPwd,
    setFocusPwd,
    focusUsername,
    setFocusUsername,
    pwdConfirm,
    setPwdConfirm,
    focusPwdConfirm,
    setFocusPwdConfirm,
  ] = useInputs();

  const [isLoading, errMsg, signUp, success] = useSignUp();

  const handelSubmit = async () => {
    const userInfo = jwt_decode(register.accessToken);
    await signUp(
      userInfo.email,
      username,
      pwd,
      pwdConfirm,
      userInfo.given_name,
      userInfo.family_name,
      userInfo.picture
    );
  };

  let content;

  if (success) {
    content = <Success />;
  } else {
    content = (
      <main className="signup">
        <section className="completeInfo">
          <h1>Complete info</h1>

          <article>
            {isLoading ? (
              <p>
                {" "}
                <Loading zoom={"0.3"} />
              </p>
            ) : (
              errMsg && <p className="msg">{errMsg}</p>
            )}
            <Username
              setUsername={setUsername}
              setFocusUsername={setFocusUsername}
              focusUsername={focusUsername}
            />
            <Password
              setPwd={setPwd}
              setFocusPwd={setFocusPwd}
              focusPwd={focusPwd}
            />
            <ConfirmPassword
              setPwdConfirm={setPwdConfirm}
              setFocusPwdConfirm={setFocusPwdConfirm}
              focusPwdConfirm={focusPwdConfirm}
            />
            <button
              onClick={handelSubmit}
              className="sign-button"
              style={{ marginTop: "40px" }}>
              Sign up
            </button>
          </article>
        </section>
      </main>
    );
  }
  return content;
};

export default CompleteInfo;

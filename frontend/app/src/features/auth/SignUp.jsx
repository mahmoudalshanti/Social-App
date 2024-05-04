import useSignUp from "../../hooks/useSignUp";
import useInputs from "../../hooks/useInputs";
import { useRegister } from "../../context/RegisterProvider";
import { useNavigate } from "react-router-dom";
import Username from "../../components/Username";
import Password from "../../components/Password";
import ConfirmPassword from "../../components/ConfirmPassword";
import Loading from "../../components/Loading";
import Email from "../../components/Email";
import FName from "../../components/FName";
import LName from "../../components/LName";

const SignUp = () => {
  const { setRegister } = useRegister();
  const [
    email,
    setEmail,
    focusEmail,
    setFocusEmail,
    username,
    setUsername,
    focusUsername,
    setFocusUsername,
    pwd,
    setPwd,
    focusPwd,
    setFocusPwd,
    pwdConfirm,
    setPwdConfirm,
    focusPwdConfirm,
    setFocusPwdConfirm,
    fName,
    setFName,
    focusFName,
    setFocusFName,
    lName,
    setLName,
    focusLName,
    setFocusLName,
  ] = useInputs();

  // eslint-disable-next-line no-unused-vars

  const [isLoading, errMsg, signUp, success] = useSignUp();
  const navigate = useNavigate();

  if (success) navigate("/uploadprofileimage");

  const handelSubmit = async () => {
    const data = await signUp(email, username, pwd, pwdConfirm, fName, lName);
    if (data) setRegister({ accessToken: data?.accessToken });
  };

  let content;

  content = (
    <main className="signup">
      <section>
        <h1>Sign up with tag</h1>
        {!success ? (
          <article>
            {isLoading ? (
              <p>
                {" "}
                <Loading zoom={"0.3"} />
              </p>
            ) : (
              errMsg && <p className="msg">{errMsg}</p>
            )}
            <Email
              setEmail={setEmail}
              setFocusEmail={setFocusEmail}
              focusEmail={focusEmail}
            />
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
            <FName
              setFName={setFName}
              setFocusFName={setFocusFName}
              focusFName={focusFName}
            />
            <LName
              setLName={setLName}
              setFocusLName={setFocusLName}
              focusLName={focusLName}
            />
            <button
              onClick={handelSubmit}
              className="sign-button"
              style={{ marginTop: "40px" }}>
              Sign up
            </button>
          </article>
        ) : (
          ""
        )}
      </section>
    </main>
  );

  return content;
};

export default SignUp;

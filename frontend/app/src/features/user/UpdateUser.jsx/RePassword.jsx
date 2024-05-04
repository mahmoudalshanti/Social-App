import useInputs from "../../../hooks/useInputs";
import useUpdateUser from "../../../hooks/useUpdateUser";
import { useUser } from "../../../context/UserProvider";
import Loading from "../../../components/Loading";
import Password from "../../../components/Password";
import ConfirmPassword from "../../../components/ConfirmPassword";

const RePassword = () => {
  const [
    pwd,
    setPwd,
    focusPwd,
    setFocusPwd,
    pwdConfirm,
    setPwdConfirm,
    focusPwdConfirm,
    setFocusPwdConfirm,
  ] = useInputs();
  const [error, isLoading, success, updateUser] = useUpdateUser();
  const { user } = useUser();

  const handelSubmit = async () => {
    const data = await updateUser({ id: user.id, pwd, pwdConfirm });
    console.log("DATA", data);
  };
  return (
    <main className="signup">
      <section>
        <h1>Update Password</h1>

        <article>
          {isLoading ? (
            <p>
              {" "}
              <Loading zoom={"0.3"} />
            </p>
          ) : success ? (
            <h1 className="success">Done</h1>
          ) : (
            error && <p className="msg">{error}</p>
          )}

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
            Done
          </button>
        </article>
      </section>
    </main>
  );
};

export default RePassword;
